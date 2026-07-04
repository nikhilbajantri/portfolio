import { z } from "astro:content";

export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  bio: z.string(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  website: z.string().url().optional(),
  pronouns: z.string().optional(),
  location: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  email: z.string().email().optional()
});
