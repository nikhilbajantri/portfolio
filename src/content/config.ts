import { defineCollection, reference, z } from 'astro:content';
import {
  authorSchema,
  taxonomySchema,
  writingSchema,
  projectSchema,
  noteSchema,
  bookSchema,
  labSchema,
  knowledgeSchema,
  releaseSchema
} from './schemas';

const authors = defineCollection({
  type: 'content',
  schema: authorSchema
});

const taxonomies = defineCollection({
  type: 'content',
  schema: taxonomySchema
});

const writing = defineCollection({
  type: 'content',
  schema: writingSchema
});

const drafts = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    cover: z.string().optional(),
    author: reference('authors').optional(),
    toc: z.boolean().default(true),
    canonical: z.string().optional(),
    status: z.string().default("Draft")
  })
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema
});

const notes = defineCollection({
  type: 'content',
  schema: noteSchema
});

const books = defineCollection({
  type: 'content',
  schema: bookSchema
});

const lab = defineCollection({
  type: 'content',
  schema: labSchema
});

const knowledge = defineCollection({
  type: 'content',
  schema: knowledgeSchema
});

const releases = defineCollection({
  type: 'content',
  schema: releaseSchema
});

const journey = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number(),
    milestone: z.string(),
    description: z.string(),
    metrics: z.string().optional()
  })
});

const readingList = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.string(),
    status: z.enum(["Reading", "Wishlist", "Completed", "Paused"]),
    dateAdded: z.coerce.date()
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string()
  })
});

const homepage = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    widgets: z.array(z.object({
      id: z.string(),
      enabled: z.boolean(),
      layout: z.string().optional(),
      variant: z.string().optional(),
      priority: z.number(),
      limit: z.number().optional(),
      columns: z.number().optional()
    })).optional()
  })
});

export const collections = {
  authors,
  taxonomies,
  writing,
  drafts,
  projects,
  notes,
  books,
  lab,
  knowledge,
  journey,
  'reading-list': readingList,
  pages,
  homepage,
  releases
};
