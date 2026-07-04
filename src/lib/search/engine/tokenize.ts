export function tokenizeQuery(query: string): string[] {
  if (!query) return [];
  return query.split(" ").filter(Boolean);
}
export default tokenizeQuery;
