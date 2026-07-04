export enum SearchCategory {
  Project = "project",
  Article = "article",
  Note = "note",
  Lab = "lab",
  Reference = "reference",
  Book = "book",
  Page = "page",
  Command = "command"
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
  aliases: string[];
  pinned: boolean;
  tags: string[];
  readingTime?: number;
  year?: number;
  status?: string;
  priority?: number;
}

export interface SearchIndexData {
  version: string;
  timestamp: string;
  items: SearchItem[];
}

export async function fetchSearchIndex(): Promise<SearchItem[]> {
  try {
    const res = await fetch("/search-index.json");
    if (!res.ok) throw new Error("Failed to fetch search index");
    const data: SearchIndexData = await res.json();
    return data.items;
  } catch (e) {
    console.error("Search index retrieval failure, falling back to empty database:", e);
    return [];
  }
}
