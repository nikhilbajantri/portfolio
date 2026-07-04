import type { ScoredCandidate } from "./scorer";

export function sortResults(scored: ScoredCandidate[]): ScoredCandidate[] {
  return scored.sort((a, b) => b.score - a.score);
}

export default sortResults;
