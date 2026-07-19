/**
 * Formats a date as relative time: "3 days ago", "in 2 hours", "just now", etc.
 * Handles both past dates (createdAt) and future dates (deadLine) automatically.
 */
export function formatRelativeTime(dateStr?: string | number | Date): string {
  if (dateStr === undefined || dateStr === null || dateStr === "") return "—";

  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  if (isNaN(date.getTime())) return "—";

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const isFuture = diffMs > 0;
  const absMs = Math.abs(diffMs);

  const seconds = Math.floor(absMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let value: number;
  let unit: string;

  if (years > 0) {
    value = years;
    unit = "year";
  } else if (months > 0) {
    value = months;
    unit = "month";
  } else if (days > 0) {
    value = days;
    unit = "day";
  } else if (hours > 0) {
    value = hours;
    unit = "hour";
  } else if (minutes > 0) {
    value = minutes;
    unit = "minute";
  } else {
    return "just now";
  }

  const plural = value === 1 ? unit : `${unit}s`;
  return isFuture ? `in ${value} ${plural}` : `${value} ${plural} ago`;
}

// Examples:
// formatRelativeTime("2026-07-18T18:30:00.000Z") -> "1 day ago"   (if today is 2026-07-19)
// formatRelativeTime("2026-07-27T18:30:00.000Z") -> "in 8 days"
// formatRelativeTime(undefined)                   -> "—"