import type { SearchItem, SearchFilter } from "../types";
import { weights } from "../weights";
import { scoreFuzzyMatch } from "../fuzzy";

export interface ScoredCandidate {
  item: SearchItem;
  score: number;
}

export function scoreCandidates(items: SearchItem[], filter: SearchFilter): ScoredCandidate[] {
  const queryText = filter.text.toLowerCase();
  
  if (!queryText) {
    return items.map(item => ({ item, score: 1 }));
  }

  return items.map(item => {
    let score = 0;
    
    // 1. Title matching
    const titleLower = item.title.toLowerCase();
    if (titleLower === queryText) {
      score += weights.EXACT_TITLE;
    } else if (titleLower.startsWith(queryText)) {
      score += weights.STARTS_WITH;
    } else if (titleLower.includes(" " + queryText) || titleLower.includes("-" + queryText)) {
      score += weights.WHOLE_WORD;
    } else {
      const fuzzyTitle = scoreFuzzyMatch(item.title, queryText);
      if (fuzzyTitle > 0) {
        score += fuzzyTitle;
      }
    }

    // 2. Aliases/Keywords/Synonyms matching
    const aliasMatches = [
      ...(item.aliases || []),
      ...(item.keywords || []),
      ...(item.synonyms || [])
    ];
    for (const alias of aliasMatches) {
      const aliasLower = alias.toLowerCase();
      if (aliasLower === queryText) {
        score += weights.EXACT_ALIAS;
      } else if (aliasLower.includes(queryText)) {
        score += weights.ALIAS;
      }
    }

    // 3. Tags matching
    for (const tag of item.tags) {
      if (tag.toLowerCase() === queryText) {
        score += weights.TAG;
      }
    }

    // 4. Description matching
    if (item.description && item.description.toLowerCase().includes(queryText)) {
      score += weights.DESCRIPTION;
    }

    return { item, score };
  }).filter(sc => sc.score > 0);
}

export default scoreCandidates;
