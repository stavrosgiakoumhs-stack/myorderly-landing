const TABLE_PREFIX = "Τραπέζι";

function collapseSpaces(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function formatTableDisplayName(name: string): string {
  const trimmed = collapseSpaces(name);
  if (!trimmed) return TABLE_PREFIX;
  if (new RegExp(`^${TABLE_PREFIX}\\b`, "iu").test(trimmed)) return trimmed;
  return `${TABLE_PREFIX} ${trimmed}`;
}

export const DEFAULT_GUEST_COUNT = 2;
export const MIN_GUEST_COUNT = 1;
export const MAX_GUEST_COUNT = 99;

export function clampGuestCount(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_GUEST_COUNT;
  return Math.min(MAX_GUEST_COUNT, Math.max(MIN_GUEST_COUNT, Math.trunc(value)));
}

export function parseGuestCount(value: number | string): number | null {
  if (typeof value === "string" && value.trim() === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < MIN_GUEST_COUNT || parsed > MAX_GUEST_COUNT) {
    return null;
  }
  return parsed;
}

export function formatDemoDateTime(iso: string): string {
  return new Intl.DateTimeFormat("el-GR", { dateStyle: "short", timeStyle: "short" }).format(new Date(iso));
}
