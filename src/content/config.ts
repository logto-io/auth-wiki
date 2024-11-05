import { defineCollection, z } from 'astro:content';

const termsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'terms': termsCollection,
};
