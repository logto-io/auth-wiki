import path from "node:path";
import { zFrontmatter, zHeading, type Article } from "../types";

const rawArticles = Object.entries(
  import.meta.glob("../articles/*.mdx", { eager: true }),
);

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export const articles = rawArticles.map<Article>(([key, article]) => {
  if (!isRecord(article)) {
    throw new Error("Article is not a record");
  }

  if (typeof article.Content !== "function") {
    throw new Error("Article Content is not a function");
  }

  const result = zFrontmatter.safeParse(article.frontmatter);

  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${key}: ${result.error.message}`);
  }

  const { data: frontmatter } = result;
  const basename = path.basename(key, '.mdx');
  return {
    slug: frontmatter.slug ?? basename,
    basename,
    frontmatter,
    getHeadings: () => zHeading.array().parse(typeof article.getHeadings === 'function' && article.getHeadings()),
    Content: article.Content,
  }
});
