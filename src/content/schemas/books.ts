import { z } from "astro:content";

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  recommended: z.boolean().default(false),
  finished: z.coerce.date().optional(),
  status: z.enum(["Reading", "Wishlist", "Completed", "Paused"]),
  category: z.string(),
  favoriteQuote: z.string().optional(),
  ideas: z.array(z.string()).default([]),
  relatedArticles: z.array(z.string()).default([]),
  cover: z.string().optional(),
  version: z.number().default(1),
  revision: z.number().default(1),
  statusLabel: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived", "Deprecated"]).default("Published")
});
