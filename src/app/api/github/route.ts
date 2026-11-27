import { NextResponse } from "next/server";
import { portfolio } from "~/portfolio.config";
import snapshot from "@/data/stats-snapshot.json";
import { snapshotCalendar } from "@/lib/stats/github-calendar";
import { createGithubService } from "@/lib/stats/github-service";

const service = createGithubService({
  login: portfolio.handles.github,
  token: () => process.env.GITHUB_TOKEN,
  snapshot: snapshotCalendar(snapshot.github, portfolio.handles.github),
  onFailure: reason => console.warn("[github-calendar]", reason),
});

// Compatibility: the existing client uses POST. No request input is read,
// forwarded, parsed, or used for query construction or cache keys.
export async function POST() {
  const result = await service.get();
  return NextResponse.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "no-store" },
  });
}
