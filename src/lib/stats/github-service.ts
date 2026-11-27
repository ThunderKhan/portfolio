import type { ContributionCalendar } from "./github-calendar";

export const FRESH_MS = 60 * 60 * 1000;
export const STALE_MS = 24 * FRESH_MS;
export const RETRY_MS = 5 * 60 * 1000;
export const MAX_RESPONSE_BYTES = 256 * 1024;

const QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          months { name }
          weeks { contributionDays { contributionCount date } }
        }
      }
    }
  }
`;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function count(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

// Rebuild only the public display fields, rejecting malformed or oversized
// calendars instead of forwarding arbitrary upstream objects to browsers.
export function validateCalendar(value: unknown): ContributionCalendar | null {
  const input = record(value);
  if (!input || !count(input.totalContributions) ||
      !Array.isArray(input.months) || !input.months.length || input.months.length > 13 ||
      !Array.isArray(input.weeks) || !input.weeks.length || input.weeks.length > 54) return null;
  const months: ContributionCalendar["months"] = [];
  const weeks: ContributionCalendar["weeks"] = [];
  for (const value of input.months) {
    const month = record(value);
    if (!month || typeof month.name !== "string" || !/^[A-Za-z]{3,9}$/.test(month.name)) return null;
    months.push({ name: month.name });
  }
  let previous = "";
  let days = 0;
  let total = 0;
  for (const value of input.weeks) {
    const week = record(value);
    if (!week || !Array.isArray(week.contributionDays) || !week.contributionDays.length || week.contributionDays.length > 7) return null;
    const contributionDays: ContributionCalendar["weeks"][number]["contributionDays"] = [];
    for (const item of week.contributionDays) {
      const day = record(item);
      if (!day || typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !count(day.contributionCount)) return null;
      const date = new Date(day.date + "T00:00:00Z");
      if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== day.date || day.date <= previous) return null;
      previous = day.date;
      total += day.contributionCount;
      if (++days > 367 || !Number.isSafeInteger(total)) return null;
      contributionDays.push({ date: day.date, contributionCount: day.contributionCount });
    }
    weeks.push({ contributionDays });
  }
  if (total !== input.totalContributions) return null;
  return { totalContributions: total, months, weeks };
}

async function readJson(response: Response): Promise<unknown> {
  if (!response.body) throw new Error("missing body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let text = "";
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_RESPONSE_BYTES) {
        void reader.cancel().catch(() => {});
        throw new Error("oversized body");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

function retryDeadline(headers: Headers, now: number): number {
  const retry = headers.get("retry-after");
  const seconds = retry !== null && /^\d+$/.test(retry) ? Number(retry) : NaN;
  const retryAt = Number.isFinite(seconds) ? now + seconds * 1000 : Date.parse(retry ?? "");
  const reset = headers.get("x-ratelimit-remaining") === "0" ? Number(headers.get("x-ratelimit-reset")) * 1000 : NaN;
  return Math.max(now + RETRY_MS, Number.isFinite(retryAt) ? retryAt : 0, Number.isFinite(reset) ? reset : 0);
}

type Result =
  | { status: 200; body: { calendar: ContributionCalendar; stale: boolean; asOf?: string } }
  | { status: 502 | 503; body: { error: string } };

type Options = {
  login: string;
  token: () => string | undefined;
  snapshot: ContributionCalendar | null;
  fetcher?: typeof fetch;
  now?: () => number;
};

// Single fixed-account cache, bounded to one validated calendar and one
// in-flight fetch per process. No user-controlled cache keys or IP assumptions.
export function createGithubService({ login, token, snapshot, fetcher = fetch, now = Date.now }: Options) {
  const saved = validateCalendar(snapshot);
  let cached: { calendar: ContributionCalendar; at: number } | null = null;
  let pending: Promise<Result> | null = null;
  let retryAt = 0;

  function fallback(status: 502 | 503, error: string): Result {
    const calendar = cached && now() - cached.at <= STALE_MS ? cached.calendar : saved;
    return calendar
      ? { status: 200, body: { calendar, stale: true, asOf: calendar.weeks.at(-1)?.contributionDays.at(-1)?.date } }
      : { status, body: { error } };
  }

  async function refresh(secret: string): Promise<Result> {
    try {
      const response = await fetcher("https://api.github.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
        body: JSON.stringify({ query: QUERY, variables: { login } }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      });
      retryAt = retryDeadline(response.headers, now());
      if (!response.ok) {
        void response.body?.cancel().catch(() => {});
        return fallback(502, "Failed to fetch from GitHub");
      }
      const json = record(await readJson(response));
      const user = record(record(json?.data)?.user);
      const collection = record(user?.contributionsCollection);
      // GraphQL can return HTTP 200 with errors or partial data.
      const calendar = json && !json.errors ? validateCalendar(collection?.contributionCalendar) : null;
      if (!calendar) return fallback(502, "Failed to fetch from GitHub");
      cached = { calendar, at: now() };
      return { status: 200, body: { calendar, stale: false } };
    } catch {
      // Do not log exception objects, response bodies, headers or credentials.
      retryAt = Math.max(retryAt, now() + RETRY_MS);
      return fallback(502, "Failed to fetch from GitHub");
    }
  }

  return {
    get(): Promise<Result> {
      const secret = token();
      if (!secret || !login) return Promise.resolve(fallback(503, "GitHub is not configured"));
      if (cached && now() - cached.at < FRESH_MS) {
        return Promise.resolve({ status: 200, body: { calendar: cached.calendar, stale: false } });
      }
      if (pending) return pending;
      if (now() < retryAt) return Promise.resolve(fallback(502, "Failed to fetch from GitHub"));
      pending = refresh(secret).finally(() => { pending = null; });
      return pending;
    },
  };
}
