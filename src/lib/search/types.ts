export { SearchCategory, type SearchItem, type SearchFilter, type SearchItemMetadata } from "../../types/Search";
export interface GroupedResults {
  categoryName: string;
  categoryKey: string;
  items: any[];
}

export interface SearchEngineOutput {
  isCommandMode: boolean;
  totalResults: number;
  grouped: GroupedResults[];
  didYouMean?: string;
}
