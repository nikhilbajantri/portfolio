import { z } from "astro:content";

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  topic: z.string(),
  tags: z.array(z.string()),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedTime: z.string().optional(),
  related: z.array(z.string()).default([]),
  summary: z.string().optional(),
  version: z.number().default(1),
  revision: z.number().default(1),
  status: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived", "Deprecated"]).default("Published"),
  date: z.coerce.date()
});
