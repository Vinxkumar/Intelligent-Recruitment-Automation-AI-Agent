/**
 * Converts SCREAMING_SNAKE_CASE enum values from the backend into
 * human-readable display labels.
 *
 * "FULL_TIME"  -> "Full Time"
 * "ON_SITE"    -> "On-Site"
 * "HYBRID"     -> "Hybrid"
 * "INTERNSHIP" -> "Internship"
 */
export function formatEnumLabel(value?: string): string {
  if (!value) return "";

  // Special-cased for readability rather than generic Title Case
  const overrides: Record<string, string> = {
    ON_SITE: "On-Site",
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    INTERNSHIP: "Internship",
    CONTRACT: "Contract",
    REMOTE: "Remote",
    HYBRID: "Hybrid",
    FRESHER: "Fresher",
    JUNIOR: "Junior",
    INTERMEDIATE: "Intermediate",
    SENIOR: "Senior",
  };

  return (
    overrides[value] ??
    value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}