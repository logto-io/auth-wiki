import { z } from "astro/zod";

export const zFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  tags: z.array(z.string()),
});

export type Frontmatter = z.infer<typeof zFrontmatter>;

export const zHeading = z.object({
  depth: z.number(),
  slug: z.string(),
  text: z.string(),
});

export type Heading = z.infer<typeof zHeading>;

export type Article = {
  /** 
   * The URL-friendly slug of the article. If not provided in the frontmatter, it will be the
   * basename of the file. 
   */
  slug: string;
  frontmatter: Frontmatter;
  /** The basename of the file, without the `.mdx` extension. */
  basename: string;
  getHeadings: () => Heading[];
  Content: Function;
}
