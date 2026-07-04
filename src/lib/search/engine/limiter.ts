import type { ScoredCandidate } from "./scorer";

export function limitResults(scored: ScoredCandidate[], limitNum: number = 20): ScoredCandidate[] {
  return scored.slice(0, limitNum);
}

export default limitResults;
