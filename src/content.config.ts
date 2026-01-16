import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const termsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/terms" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'terms': termsCollection,
};
