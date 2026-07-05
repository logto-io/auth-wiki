import type { APIRoute } from 'astro';
import { getCollection } from "astro:content";
import { defaultLocale } from "astro-i18n-aut";
import { chromium } from "playwright";
import pc from "picocolors"
import pMap from "p-map";
import { buildCover } from '../../../utils/cover';
import { getSlugFromId } from '../../../utils/string';

const getTimeString = () => {
  const now = new Date();
  return `${
    now.getHours().toString().padStart(2, '0')
  }:${
    now.getMinutes().toString().padStart(2, '0')
  }:${
    now.getSeconds().toString().padStart(2, '0')
  }`;
};

const buildCoverWithRetry = async (...args: Parameters<typeof buildCover>) => {
  const maxAttempts = 3;
  for (let attempt = 1; ; attempt++) {
    try {
      return await buildCover(...args);
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }
      console.warn(pc.yellow(`Retrying cover build (attempt ${attempt + 1}/${maxAttempts}):`), error);
    }
  }
};

export async function getStaticPaths() {
  const browser = await chromium.launch();
  const terms = await getCollection("terms");

  try {
    // Share one context so covers reuse its HTTP cache for the Google Fonts assets.
    const context = await browser.newContext();

    return await pMap(
      terms,
      async ({ id, data }) => {
        const [locale, ...rest] = getSlugFromId(id).split("/");
        const buffer = await buildCoverWithRetry(context, data.title, locale ?? defaultLocale);
        const isDefaultLocale = locale === defaultLocale;

        console.log(
          pc.dim(getTimeString()),
          ' ',
          pc.green('✓'),
          pc.dim((isDefaultLocale ? `/${rest.join('/')}` : `/${id}`) + '/cover.png'),
        );
        return {
          params: isDefaultLocale ? { lang: rest.join('/') } : { lang: locale, slug: rest.join('/') },
          props: { buffer },
        }
      },
      // Limit concurrency to avoid overwhelming the system
      { concurrency: 10 }
    );
  } finally {
    await browser.close();
  }
}

export const GET: APIRoute = async ({ props: { buffer } }) => {
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
