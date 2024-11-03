import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';
import { rehypeShiki } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://auth.wiki',
  build: {
    format: 'file',
  },
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { dark: true, strategy: 'img-svg' }],
      [rehypeShiki, { themes: { light: 'one-light', dark: 'one-dark-pro' } }]
    ],
    remarkRehype: {
      footnoteLabelTagName: 'span',
    },
    syntaxHighlight: false
  },
  integrations: [mdx(), sitemap(), icon()]
});
