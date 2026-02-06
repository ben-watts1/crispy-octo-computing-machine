export const BADGE_OPTIONS = [
  "Top-tier investors",
  "YC-backed",
  "Repeat founders",
  "Ex–Big Tech team",
  "Seed-stage",
  "Series A",
  "Series B",
  "<50 employees",
  "First engineering hires",
  "Engineering-led org",
  "Hybrid NYC (3–5 days)"
] as const;

export const NYC_PRESENCE_OPTIONS = [
  { value: "NYC_OFFICE", label: "NYC office" },
  { value: "NYC_HYBRID", label: "NYC hybrid" },
  { value: "NYC_REMOTE_ALLOWED", label: "Remote allowed (NYC)" },
  { value: "UNKNOWN", label: "Unknown" }
] as const;

export const INDUSTRY_OPTIONS = [
  { value: "FINTECH", label: "Fintech" },
  { value: "HEALTH", label: "Health" },
  { value: "DEVTOOLS", label: "Devtools" },
  { value: "AI", label: "AI" },
  { value: "MARKETPLACE", label: "Marketplace" },
  { value: "CONSUMER", label: "Consumer" },
  { value: "B2B_SAAS", label: "B2B SaaS" },
  { value: "OTHER", label: "Other" }
] as const;

export const HIRING_STATUS_OPTIONS = [
  { value: "ACTIVELY_INTERVIEWING", label: "Actively interviewing" },
  { value: "RECENTLY_POSTED", label: "Recently posted" },
  { value: "HIRING", label: "Hiring" },
  { value: "UNKNOWN", label: "Unknown" }
] as const;

export const getOptionLabel = (
  options: { value: string; label: string }[],
  value: string
) => options.find((option) => option.value === value)?.label ?? value;
