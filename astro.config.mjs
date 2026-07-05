import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';
import { rehypeShiki, unified } from '@astrojs/markdown-remark';
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

// Vite compiles MDX files in parallel, and rehype-mermaid opens a browser tab per
// file being rendered. Without a cap, hundreds of tabs open at once and exhaust
// system memory, so gate Mermaid rendering behind a small global concurrency limit.
const mermaidRenderLimit = 2;
let activeMermaidRenders = 0;
const pendingMermaidRenders = [];
const acquireMermaidSlot = () =>
  new Promise((resolve) => {
    if (activeMermaidRenders < mermaidRenderLimit) {
      activeMermaidRenders += 1;
      resolve();
    } else {
      pendingMermaidRenders.push(resolve);
    }
  });
const releaseMermaidSlot = () => {
  const next = pendingMermaidRenders.shift();
  if (next) {
    next();
  } else {
    activeMermaidRenders -= 1;
  }
};
const rehypeMermaidThrottled = (options) => {
  const transform = rehypeMermaid(options);
  return async (...args) => {
    await acquireMermaidSlot();
    try {
      return await transform(...args);
    } finally {
      releaseMermaidSlot();
    }
  };
};

// https://astro.build/config
export default defineConfig({
  site: 'https://auth.wiki',
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  // Keep the pre-v7 HTML-aware whitespace handling; the v7 'jsx' default strips
  // spaces between inline elements.
  compressHTML: true,
  markdown: {
    // Astro 7 renders Markdown with its native Sätteri pipeline by default; keep
    // using the unified (remark/rehype) pipeline since our plugins depend on it.
    processor: unified({
      remarkPlugins: [remarkCustomHeaderId],
      rehypePlugins: [
        [
          rehypeMermaidThrottled,
          { dark: true, strategy: 'img-svg', launchOptions: { headless: true } },
        ],
        [rehypeShiki, { themes: { light: 'one-light', dark: 'one-dark-pro' } }]
      ],
      remarkRehype: {
        footnoteLabelTagName: 'span',
      },
    }),
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
