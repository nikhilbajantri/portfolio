export interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
}

const STORAGE_KEY = "recentSearches";

export function getRecentSearches(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items: HistoryItem[] = JSON.parse(raw);
    
    // Sort latest timestamp first
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (e) {
    console.error("Failed to read search history:", e);
    return [];
  }
}

export function saveSearchHistory(id: string, url: string): void {
  try {
    const items = getRecentSearches();
    
    // Remove existing matching ID
    const filtered = items.filter(item => item.id !== id);
    
    // Add new search item to the top
    const newItem: HistoryItem = {
      id,
      url,
      timestamp: new Date().toISOString()
    };
    
    // Limit history size to last 8 elements
    const updated = [newItem, ...filtered].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save search history:", e);
  }
}
