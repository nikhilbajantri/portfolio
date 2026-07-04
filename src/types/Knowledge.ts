import type { VersionedMetadata } from "./Content";

export type KnowledgeDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type KnowledgeCategory =
  | "Systems"
  | "Networking"
  | "Backend"
  | "Security"
  | "Databases"
  | "Linux"
  | "Architecture"
  | "AI"
  | "Career";

export interface KnowledgeItem extends VersionedMetadata {
  title: string;
  category: KnowledgeCategory;
  difficulty: KnowledgeDifficulty;
  why: string;
  bestFor: string;
  resources: Array<{ name: string; url: string; type: string }>;
}
export interface KnowledgeTopic {
  title: string;
  resources: KnowledgeItem[];
}
