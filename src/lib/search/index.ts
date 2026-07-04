import { normalizeQuery } from "./engine/normalize";
import { tokenizeQuery } from "./engine/tokenize";
import { parseSearchFilters } from "./engine/parser";
import { validateFilters } from "./engine/validator";
import { buildCandidateSet } from "./engine/candidate";
import { scoreCandidates } from "./engine/scorer";
import { sortResults } from "./engine/sorter";
import { limitResults } from "./engine/limiter";
import { groupResults } from "./engine/grouper";
import { commands } from "./commands";
import type { SearchItem, SearchEngineOutput } from "./types";

export * from "./types";
export { fetchSearchIndex } from "./search-index";
export { getRecentSearches, saveSearchHistory } from "./search-history";

export function performSearchPipeline(
  items: SearchItem[],
  query: string,
  activeFilter: string = "all"
): SearchEngineOutput {
  const normalized = normalizeQuery(query);
  const isCommandMode = normalized.startsWith(">");

  // 1. Command Mode Execution
  if (isCommandMode) {
    const cmdQuery = normalized.slice(1).trim().toLowerCase();
    const matchedCmds = cmdQuery
      ? commands.filter(cmd =>
          cmd.title.toLowerCase().includes(cmdQuery) ||
          cmd.description.toLowerCase().includes(cmdQuery)
        )
      : commands;

    return {
      isCommandMode: true,
      totalResults: matchedCmds.length,
      grouped: [
        {
          categoryKey: "command",
          categoryName: `COMMANDS (${matchedCmds.length})`,
          items: matchedCmds
        }
      ]
    };
  }

  // 2. Standard Search Execution
  const tokens = tokenizeQuery(normalized);
  let filter = parseSearchFilters(tokens);
  
  if (activeFilter !== "all") {
    filter.category = activeFilter;
  }

  filter = validateFilters(filter);

  const candidates = buildCandidateSet(items, filter);
  const scored = scoreCandidates(candidates, filter);
  const sorted = sortResults(scored);
  const limited = limitResults(sorted);
  const grouped = groupResults(limited);

  const totalResults = sorted.length;
  let didYouMean: string | undefined;

  // 3. Typo Correction Suggestions (didYouMean)
  if (totalResults === 0 && filter.text.length > 3) {
    const targetText = filter.text.toLowerCase();
    let bestMatch: string | undefined;
    let minDistance = 4;

    for (const item of items) {
      const candidatesList = [
        item.title,
        ...(item.tags || []),
        ...(item.aliases || []),
        ...(item.keywords || [])
      ];

      for (const cand of candidatesList) {
        if (!cand) continue;
        const dist = getLevenshteinDistance(targetText, cand.toLowerCase());
        if (dist < minDistance) {
          minDistance = dist;
          bestMatch = cand;
        }
      }
    }

    if (bestMatch) {
      didYouMean = bestMatch;
    }
  }

  return {
    isCommandMode: false,
    totalResults,
    grouped,
    didYouMean
  };
}

// Levenshtein Helper
function getLevenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
export default performSearchPipeline;
