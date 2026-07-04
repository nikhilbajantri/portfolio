export type ContentStatus = "Draft" | "Review" | "Scheduled" | "Published" | "Archived" | "Deprecated";

export interface VersionedMetadata {
  version: number;
  created: string;
  updated: string;
  reviewed?: string;
  revision: number;
  status: ContentStatus;
}
