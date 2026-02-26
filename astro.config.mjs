import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';
import { rehypeShiki } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import remarkCustomHeaderId from 'remark-custom-header-id';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";

export const defaultLocale = 'en';
export const locales = Object.freeze({
  ar: 'ar',
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  it: 'it',
  ko: 'ko',
  ja: 'ja',
  nl: 'nl',
  'pt-br': 'pt-BR',
  'pt-pt': 'pt-PT',
  zh: 'zh-Hans',
  // Astro doesn't maintain the case when generating file-based slugs, so we need to use the
  // lowercase version of the locale code as the key.
  // See: https://github.com/withastro/roadmap/pull/373#issuecomment-1332459000
  // See: https://github.com/withastro/roadmap/discussions/516
  'zh-hant': 'zh-Hant',
});

// https://astro.build/config
export default defineConfig({
  site: 'https://auth.wiki',
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { dark: true, strategy: 'img-svg' }],
      [rehypeShiki, { themes: { light: 'one-light', dark: 'one-dark-pro' } }]
    ],
    remarkPlugins: [remarkCustomHeaderId],
    remarkRehype: {
      footnoteLabelTagName: 'span',
    },
    syntaxHighlight: false
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
      exclude: ['pages/**/*.ts']
    }),
    mdx(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    icon()
  ]
});
