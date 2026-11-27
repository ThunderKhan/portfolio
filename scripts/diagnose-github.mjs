// Local diagnostic only. Load the existing private environment; do not print
// credentials, raw upstream errors, payloads, request headers or calendar data.
import { portfolio } from "../portfolio.config.ts";
import { createGithubService } from "../src/lib/stats/github-service.ts";

if (!process.env.GITHUB_TOKEN) {
  console.log("GITHUB_TOKEN: missing");
  process.exitCode = 1;
} else {
  const reasons = [];
  const service = createGithubService({
    login: portfolio.handles.github,
    token: () => process.env.GITHUB_TOKEN,
    snapshot: null,
    onFailure: reason => reasons.push(reason),
  });
  const result = await service.get();
  console.log(JSON.stringify({
    status: result.status,
    reasons,
    live: result.status === 200 && !result.body.stale,
  }, null, 2));
  if (result.status !== 200) process.exitCode = 1;
}
