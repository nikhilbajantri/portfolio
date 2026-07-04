import type { GroupedResults, SearchItem } from "../types";
import type { ScoredCandidate } from "./scorer";

const labelMap: Record<string, string> = {
  project: "PROJECTS",
  article: "ARTICLES",
  note: "FIELD NOTES",
  lab: "LAB EXPERIMENTS",
  book: "BOOKS STUDY",
  page: "PAGES",
  command: "COMMANDS"
};

export function groupResults(scored: ScoredCandidate[]): GroupedResults[] {
  const groupsMap: Record<string, SearchItem[]> = {};

  for (const candidate of scored) {
    const item = candidate.item;
    const cat = item.category;
    if (!groupsMap[cat]) {
      groupsMap[cat] = [];
    }
    groupsMap[cat].push(item);
  }

  const grouped: GroupedResults[] = [];
  for (const key of Object.keys(groupsMap)) {
    grouped.push({
      categoryKey: key,
      categoryName: `${labelMap[key] || key.toUpperCase()} (${groupsMap[key].length})`,
      items: groupsMap[key]
    });
  }

  return grouped;
}

export default groupResults;
