/**
 * Supabase joined relations may return a single object or an array
 * depending on the relationship type. This helper normalizes to a single value.
 */
export function single<T>(value: T | T[] | null): T | null {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}
