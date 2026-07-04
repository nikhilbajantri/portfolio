import { z } from "astro:content";

export const releaseSchema = z.object({
  version: z.string(), // e.g. "Edition 2026.1"
  date: z.coerce.date(),
  title: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).default([]),
  breakingChanges: z.array(z.string()).default([]),
  added: z.array(z.string()).default([]),
  improved: z.array(z.string()).default([]),
  fixed: z.array(z.string()).default([]),
  removed: z.array(z.string()).default([]),
  status: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived", "Deprecated"]).default("Published")
});
export default releaseSchema;
