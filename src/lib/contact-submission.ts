/** FormSubmit reports a JSON success value even when HTTP is 2xx.
 * Never clear a draft on an ambiguous or rejected response. */
export function contactSubmissionAccepted(ok: boolean, payload: unknown): boolean {
  if (!ok || typeof payload !== "object" || payload === null || !("success" in payload)) return false;
  return payload.success === true || payload.success === "true";
}
