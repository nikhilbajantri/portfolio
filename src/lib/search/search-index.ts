import type { SearchItem } from "./types";

export interface SearchIndexData {
  version: string;
  timestamp: string;
  items: SearchItem[];
}

export async function fetchSearchIndex(): Promise<SearchItem[]> {
  try {
    const res = await fetch("/generated/search-v1.json");
    if (!res.ok) throw new Error("Failed to fetch search index");
    const data: any = await res.json();
    return data.items;
  } catch (e) {
    console.error("Search index retrieval failure, falling back to empty database:", e);
    return [];
  }
}
