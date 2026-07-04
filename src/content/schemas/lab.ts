import { z } from "astro:content";

export const labSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["Stable", "Experimental", "Archived", "Coming Soon"]).default("Stable"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  interactive: z.boolean().default(false),
  tags: z.array(z.string()),
  source: z.string().url().optional(),
  demo: z.string().url().optional(),
  version: z.number().default(1),
  revision: z.number().default(1),
  statusLabel: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived", "Deprecated"]).default("Published")
});
