import { scoreFuzzyMatch } from "./fuzzy";
import { type SearchItem, SearchCategory } from "./search-index";

export interface RankedItem {
  item: SearchItem;
  score: number;
}

export function rankSearchItems(
  items: SearchItem[],
  query: string,
  currentPathname: string
): RankedItem[] {
  if (!query) return [];

  const lowerQuery = query.toLowerCase().trim();
  const ranked: RankedItem[] = [];

  items.forEach(item => {
    let score = 0;
    let matched = false;

    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();

    // 1. Exact Title Match
    if (titleLower === lowerQuery) {
      score += 120;
      matched = true;
    }
    // 2. Title Starts With
    else if (titleLower.startsWith(lowerQuery)) {
      score += 100;
      matched = true;
    }
    // 3. Whole Word in Title
    else if (titleLower.includes(" " + lowerQuery) || titleLower.includes("-" + lowerQuery)) {
      score += 90;
      matched = true;
    }
    // 4. Fuzzy Title Match
    else {
      const fuzzyTitleScore = scoreFuzzyMatch(item.title, lowerQuery);
      if (fuzzyTitleScore > 0) {
        score += fuzzyTitleScore;
        matched = true;
      }
    }

    // 5. Aliases Match
    if (item.aliases && item.aliases.length > 0) {
      const matchedAlias = item.aliases.some(alias => scoreFuzzyMatch(alias, lowerQuery) > 0);
      if (matchedAlias) {
        score += 80;
        matched = true;
      }
    }

    // 6. Tags Match
    if (item.tags && item.tags.length > 0) {
      const matchedTag = item.tags.some(tag => scoreFuzzyMatch(tag, lowerQuery) > 0);
      if (matchedTag) {
        score += 70;
        matched = true;
      }
    }

    // 7. Description Match
    if (descLower.includes(lowerQuery)) {
      score += 10;
      matched = true;
    } else {
      const fuzzyDescScore = scoreFuzzyMatch(item.description, lowerQuery);
      if (fuzzyDescScore > 0) {
        score += Math.round(fuzzyDescScore / 5);
        matched = true;
      }
    }

    // Only process candidates that match something
    if (matched && score > 0) {
      // 8. Category Boost
      if (item.category === SearchCategory.Project) score += 20;
      else if (item.category === SearchCategory.Article) score += 15;
      else if (item.category === SearchCategory.Lab) score += 10;
      else if (item.category === SearchCategory.Knowledge) score += 5;

      // 9. URL Awareness Penalty (Lower priority for current page)
      if (currentPathname && (item.url === currentPathname || item.url + "/" === currentPathname)) {
        score -= 50;
      }

      ranked.push({ item, score });
    }
  });

  // Sort by highest score first
  return ranked.sort((a, b) => b.score - a.score);
}
