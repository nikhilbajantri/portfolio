import type { SearchItem, SearchFilter } from "../types";

export function buildCandidateSet(items: SearchItem[], filter: SearchFilter): SearchItem[] {
  return items.filter((item) => {
    // 1. Category Filter
    if (filter.category && item.category !== filter.category) {
      return false;
    }

    // 2. Tags Filter
    if (filter.tags.length > 0) {
      const matchAll = filter.tags.every((tag) => item.tags.includes(tag));
      if (!matchAll) return false;
    }

    // 3. Year Filter
    if (filter.year !== undefined && item.metadata.year !== filter.year) {
      return false;
    }

    // 4. Status Filter
    if (filter.status && item.metadata.status !== filter.status) {
      return false;
    }

    // 5. Difficulty Filter
    if (filter.difficulty && item.metadata.difficulty !== filter.difficulty) {
      return false;
    }

    // 6. Featured Filter
    if (filter.featured !== undefined && item.metadata.featured !== filter.featured) {
      return false;
    }

    // 7. Author Filter
    if (filter.author && item.metadata.author !== filter.author) {
      return false;
    }

    return true;
  });
}

export default buildCandidateSet;
