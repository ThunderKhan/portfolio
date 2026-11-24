export type ContributionDay = { contributionCount: number; date: string };
export type ContributionCalendar = {
  totalContributions: number;
  months: { name: string }[];
  weeks: { contributionDays: ContributionDay[] }[];
};

type Snapshot = { login: string; calendar: { date: string; count: number }[] };

/** A snapshot belongs to one account and one historical window. Never relabel it. */
export function snapshotCalendar(snapshot: Snapshot, login: string): ContributionCalendar | null {
  if (!login || snapshot.login.toLowerCase() !== login.toLowerCase() || !snapshot.calendar.length) return null;
  const weeks: ContributionCalendar["weeks"] = [];
  const months: ContributionCalendar["months"] = [];
  let previousMonth = "";
  let totalContributions = 0;
  const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
  for (const day of snapshot.calendar) {
    const date = new Date(`${day.date}T00:00:00Z`);
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== day.date || !Number.isSafeInteger(day.count) || day.count < 0) return null;
    if (weeks.length === 0 || date.getUTCDay() === 0) weeks.push({ contributionDays: [] });
    weeks[weeks.length - 1].contributionDays.push({ date: day.date, contributionCount: day.count });
    const month = day.date.slice(0, 7);
    if (month !== previousMonth) {
      months.push({ name: monthFormat.format(date) });
      previousMonth = month;
    }
    totalContributions += day.count;
  }
  return { weeks, months, totalContributions };
}
