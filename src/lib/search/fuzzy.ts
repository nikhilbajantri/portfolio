export function scoreFuzzyMatch(target: string, query: string): number {
  target = target.toLowerCase();
  query = query.toLowerCase();

  if (target === query) return 100;
  if (target.startsWith(query)) return 90;
  if (target.includes(" " + query) || target.includes("-" + query)) return 85;
  if (target.includes(query)) return 80;

  // Sequential character check with gap penalty
  const baseScore = 70;
  let queryIndex = 0;
  let targetIndex = 0;
  let lastMatchedIndex = -1;
  let gapPenalty = 0;

  while (targetIndex < target.length && queryIndex < query.length) {
    if (target[targetIndex] === query[queryIndex]) {
      if (lastMatchedIndex !== -1) {
        const gap = targetIndex - lastMatchedIndex - 1;
        gapPenalty += gap * 2.5; // Penalty for gaps between matched chars
      }
      lastMatchedIndex = targetIndex;
      queryIndex++;
    }
    targetIndex++;
  }

  if (queryIndex === query.length) {
    return Math.max(15, baseScore - gapPenalty);
  }

  return 0; // No match
}
