import type { VersionedMetadata } from "./Content";

export type BookStatus = "Plan" | "Reading" | "Completed" | "Dropped";

export interface Book extends VersionedMetadata {
  title: string;
  author: string;
  category: string;
  status: BookStatus;
  progress: string;
  whyRead: string;
  ideas: string[];
  favoriteQuote?: string;
  recommend?: string;
}
