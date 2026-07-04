import { type SearchItem, SearchCategory } from "./search-index";
import { scoreFuzzyMatch } from "./fuzzy";
import { rankSearchItems, type RankedItem } from "./search-ranking";
import { commands, type CommandItem } from "./commands";

export interface GroupedResults {
  categoryName: string;
  categoryKey: string;
  items: Array<SearchItem | CommandItem>;
}

export interface SearchEngineOutput {
  isCommandMode: boolean;
  totalResults: number;
  grouped: GroupedResults[];
}

export function performSearchPipeline(
  items: SearchItem[],
  query: string,
  activeFilter: string,
  currentPathname: string
): SearchEngineOutput {
  // 1. Normalize Query
  const normalizedQuery = query.trim();
  const isCommandMode = normalizedQuery.startsWith(">");

  // 2. Command Mode Branch
  if (isCommandMode) {
    const cmdQuery = normalizedQuery.slice(1).trim().toLowerCase();
    let matchedCmds: CommandItem[] = [];
    
    if (!cmdQuery) {
      matchedCmds = commands;
    } else {
      matchedCmds = commands.filter(cmd => {
        return (
          cmd.title.toLowerCase().includes(cmdQuery) ||
          cmd.description.toLowerCase().includes(cmdQuery) ||
          scoreFuzzyMatch(cmd.title, cmdQuery) > 0
        );
      });
    }

    return {
      isCommandMode: true,
      totalResults: matchedCmds.length,
      grouped: [
        {
          categoryName: `COMMANDS (${matchedCmds.length})`,
          categoryKey: "command",
          items: matchedCmds
        }
      ]
    };
  }

  // 3. Generate Candidate Set
  let candidates = items;
  if (activeFilter !== "all") {
    candidates = items.filter(item => {
      const cat = item.category.toLowerCase();
      if (activeFilter === "writing") {
        return ["essay", "journal", "field notes", "engineering", "cybersecurity"].includes(cat);
      }
      if (activeFilter === "work") {
        return ["selected work", "professional work", "community", "archive", "project"].includes(cat);
      }
      if (activeFilter === "notes") {
        return cat === "note";
      }
      if (activeFilter === "lab") {
        return cat === "lab" || cat === "page" && item.url === "/lab";
      }
      if (activeFilter === "knowledge") {
        return cat === "knowledge" || cat === "page" && item.url === "/knowledge";
      }
      return false;
    });
  }

  // If query is empty, empty state will render, returning no ranked items
  if (!normalizedQuery) {
    return {
      isCommandMode: false,
      totalResults: 0,
      grouped: []
    };
  }

  // 4. Score Results
  const rankedCandidates = rankSearchItems(candidates, normalizedQuery, currentPathname);

  // 5. Limit Results (Top 10)
  const topRanked = rankedCandidates.slice(0, 10);

  // 6. Group Categories
  const categoryGroups: Record<string, { name: string; items: SearchItem[] }> = {
    [SearchCategory.Project]: { name: "PROJECTS", items: [] },
    [SearchCategory.Article]: { name: "ARTICLES", items: [] },
    [SearchCategory.Lab]: { name: "LABS", items: [] },
    [SearchCategory.Knowledge]: { name: "KNOWLEDGE", items: [] },
    [SearchCategory.Note]: { name: "NOTES", items: [] },
    [SearchCategory.Page]: { name: "PAGES", items: [] }
  };

  topRanked.forEach(ranked => {
    let cat = ranked.item.category;
    // Map dynamic subfolder tags to main categories
    if (["essay", "journal", "field notes", "engineering", "cybersecurity"].includes(cat)) {
      cat = SearchCategory.Article;
    }
    if (["selected work", "professional work", "community", "archive", "project"].includes(cat)) {
      cat = SearchCategory.Project;
    }

    if (categoryGroups[cat]) {
      categoryGroups[cat].items.push(ranked.item);
    } else {
      categoryGroups[SearchCategory.Page].items.push(ranked.item);
    }
  });

  // Compile Grouped Result Output List (Only non-empty groups)
  const grouped: GroupedResults[] = [];
  Object.keys(categoryGroups).forEach(key => {
    const group = categoryGroups[key];
    if (group.items.length > 0) {
      grouped.push({
        categoryName: `${group.name} (${group.items.length})`,
        categoryKey: key,
        items: group.items
      });
    }
  });

  return {
    isCommandMode: false,
    totalResults: topRanked.length,
    grouped
  };
}
