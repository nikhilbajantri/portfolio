import type { VersionedMetadata } from "./Content";

export type LabStatus = "Stable" | "Experimental" | "Archived" | "Coming Soon";

export interface LabExperiment extends VersionedMetadata {
  title: string;
  description: string;
  status: LabStatus;
  technology: string[];
  demoUrl?: string;
  sourceUrl?: string;
}
