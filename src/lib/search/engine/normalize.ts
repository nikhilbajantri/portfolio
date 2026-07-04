export function normalizeQuery(query: string): string {
  if (!query) return "";
  return query.trim().replace(/\s+/g, " ");
}
export default normalizeQuery;
