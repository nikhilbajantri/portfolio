import type { SearchFilter } from "../types";

export function parseSearchFilters(tokens: string[]): SearchFilter {
  const filter: SearchFilter = {
    text: "",
    tags: []
  };

  const textWords: string[] = [];

  for (const token of tokens) {
    if (token.startsWith("@")) {
      filter.category = token.slice(1).toLowerCase();
    } else if (token.startsWith("#")) {
      filter.tags.push(token.slice(1).toLowerCase());
    } else if (token.includes(":")) {
      const [key, value] = token.split(":", 2);
      const cleanKey = key.toLowerCase();
      
      switch (cleanKey) {
        case "tag":
          filter.tags.push(value.toLowerCase());
          break;
        case "year":
          filter.year = parseInt(value, 10);
          break;
        case "status":
          filter.status = value.toLowerCase();
          break;
        case "difficulty":
          filter.difficulty = value.toLowerCase();
          break;
        case "featured":
          filter.featured = value.toLowerCase() === "true";
          break;
        case "author":
          filter.author = value.toLowerCase();
          break;
        case "updated":
          filter.updated = value.toLowerCase();
          break;
        // Reserved filters for future extensions:
        case "topic":
        case "language":
        case "type":
        case "stack":
          // Ignore or log internally
          break;
        default:
          textWords.push(token);
          break;
      }
    } else {
      textWords.push(token);
    }
  }

  filter.text = textWords.join(" ");
  return filter;
}

export default parseSearchFilters;
