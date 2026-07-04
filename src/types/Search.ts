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

export interface SearchItemMetadata {
  year?: number;
  status?: string;
  difficulty?: string;
  featured?: boolean;
  author?: string;
  stack?: string[];
  updated?: string;
  series?: string;
  language?: string;
  topic?: string;
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: SearchCategory;
  tags: string[];
  aliases: string[];
  keywords?: string[];
  synonyms?: string[];
  redirects?: string[];
  metadata: SearchItemMetadata;
}

export interface SearchFilter {
  text: string;
  category?: string;
  tags: string[];
  year?: number;
  status?: string;
  difficulty?: string;
  featured?: boolean;
  author?: string;
  stack?: string;
  updated?: string;
}
