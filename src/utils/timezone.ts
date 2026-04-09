/**
 * Get the user's current timezone from the browser (IANA timezone, e.g. "Europe/London", "Africa/Lagos").
 * Uses the built-in Intl API - no external API needed.
 */
export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lagos';
  } catch {
    return 'Africa/Lagos';
  }
}
