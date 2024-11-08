import type { APIRoute } from 'astro';
import { getCollection } from "astro:content";
import { defaultLocale } from "astro-i18n-aut";
import { chromium } from "playwright";
import pc from "picocolors"
import pMap from "p-map";
import { buildCover } from '../../../utils/cover';

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

export async function getStaticPaths() {
  const browser = await chromium.launch();
  const terms = await getCollection("terms");

  return pMap(
    terms,
    async ({ slug, data }) => {
      const [locale, ...rest] = slug.split("/");
      const buffer = await buildCover(browser, data.title, locale ?? defaultLocale);
      const isDefaultLocale = locale === defaultLocale;

      console.log(
        pc.dim(getTimeString()),
        ' ',
        pc.green('✓'),
        pc.dim((isDefaultLocale ? `/${rest.join('/')}` : `/${slug}`) + '/cover.png'),
      );
      return {
        params: isDefaultLocale ? { lang: rest.join('/') } : { lang: locale, slug: rest.join('/') },
        props: { buffer },
      }
    },
    // Limit concurrency to avoid overwhelming the system
    { concurrency: 10 }
  );
}

export const GET: APIRoute = async ({ props: { buffer } }) => {
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
