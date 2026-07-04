import { z } from "astro:content";

export const knowledgeSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["Systems", "Networking", "Backend", "Security", "Databases", "Linux", "Architecture", "AI", "Career"]),
  why: z.string(),
  bestFor: z.string(),
  links: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  relatedTopics: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  updated: z.coerce.date(),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  estimatedTime: z.string().optional(),
  status: z.enum(["Learning", "Reference", "Mastered", "Deprecated"]).default("Reference"),
  pinned: z.boolean().default(false),
  version: z.number().default(1),
  revision: z.number().default(1),
  statusLabel: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived", "Deprecated"]).default("Published")
});
