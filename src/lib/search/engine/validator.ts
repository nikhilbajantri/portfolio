import type { SearchFilter } from "../types";

export function validateFilters(filter: SearchFilter): SearchFilter {
  // Validate Category values
  const validCategories = ["project", "article", "note", "lab", "book", "page", "command"];
  if (filter.category && !validCategories.includes(filter.category)) {
    delete filter.category;
  }

  // Validate Year value sanity
  if (filter.year !== undefined && (isNaN(filter.year) || filter.year < 2000 || filter.year > 2100)) {
    delete filter.year;
  }

  return filter;
}

export default validateFilters;
