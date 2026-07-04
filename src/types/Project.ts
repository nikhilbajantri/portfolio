import type { VersionedMetadata } from "./Content";

export type ProjectStatus = "production" | "archived" | "development" | "deprecated";

export interface ProjectMetadata extends VersionedMetadata {
  title: string;
  description: string;
  year: number;
  category: string;
  featured: boolean;
  featuredOrder?: number;
  languages?: string[];
  frameworks?: string[];
  database?: string[];
  services?: string[];
  infrastructure?: string[];
  caseStudy?: string;
  repository?: string;
  demo?: string;
}
