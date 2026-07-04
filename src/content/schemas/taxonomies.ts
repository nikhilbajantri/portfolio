import { z } from "astro:content";

export const taxonomySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  color: z.string().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  relatedTopics: z.array(z.string()).optional()
});
