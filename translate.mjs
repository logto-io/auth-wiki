import path, { basename } from 'node:path';
import fs from 'node:fs/promises';
import arg from 'arg';
import dotenv from 'dotenv';
import picocolors from 'picocolors';
import { Listr } from 'listr2';
import { defaultLocale, locales } from './astro.config.mjs';
import { OpenAiTranslate, log } from './translate.openai.mjs';
import { exit } from 'node:process';

dotenv.config();

const args = arg({
  '--slug': [String],
});
const slugs = args['--slug'];

if (!slugs?.length) {
  log('No slugs provided to translate. Automatically translating all missing entries.');
} else {
  log(`Translating entries with slugs:`);
  slugs.sort().forEach((slug) => log(`  - ${picocolors.blue(slug)}`));
}

const contentDir = 'src/content/terms';
const getDir = async (locale) => {
  const dirPath = path.join(contentDir, locale);
  const stat = await fs.stat(dirPath).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    return []
  }
  const dir = await fs.readdir(dirPath);
  return dir;
};

/** All locales except the default locale. */
const targetLocales = Object.keys(locales).filter((locale) => locale !== defaultLocale);
const defaultLocaleEntries = await getDir(defaultLocale);

log(`Found ${defaultLocaleEntries.length} entries with default locale ${defaultLocale}.`);

const rawEntries = await Promise.all(targetLocales
  .map(async (locale) => {
    const localeDir = await getDir(locale);
    return [locale, localeDir];
  })
);

/** 
 * All non-default locale entries with their locale prefix. For example, if the locale is `'es'` and
 * the entry is `'foo.md'`, the value in the set will be `'es/foo.md'`.
 */
const entriesSet = new Set(rawEntries.flatMap(([locale, localeDir]) => {
  return localeDir.map((entry) => {
    return `${locale}/${entry}`;
  });
}));

const overwriteEntries = [];
const missingEntries = defaultLocaleEntries
  .filter((entry) => !slugs?.length || slugs.includes(basename(entry, '.mdx')))
  .flatMap((entry) =>
    targetLocales
      .map((locale) => {
        if (entriesSet.has(`${locale}/${entry}`)) {
          if (slugs?.includes(basename(entry, '.mdx'))) {
            overwriteEntries.push(`${locale}/${entry}`);
            return `${locale}/${entry}`;
          }
        } else {
          return `${locale}/${entry}`;
        }
      })
  )
  .filter(Boolean);

if (overwriteEntries.length) {
  log(`The following ${overwriteEntries.length} entries will be overwritten:`);
  overwriteEntries.forEach((entry) => log(`  - ${picocolors.yellow(entry)}`));
}

log(`Found ${missingEntries.length} entries to translate.`);

const terms = ['issuer'];
const entryTerms = defaultLocaleEntries.map((entry) => basename(entry, '.mdx').split('-').join(' '));
const listr = new Listr([], { concurrent: 4 });
const openAiTranslate = new OpenAiTranslate([...new Set([...terms, ...entryTerms])]);

for (const missingEntry of missingEntries) {
  listr.add({
    task: async (_, task) => {
      task.title = `Translating ${missingEntry}...`;
      const [locale, ...rest] = missingEntry.split('/');
      const entry = rest.join('/');
      const content = await fs.readFile(path.join(contentDir, defaultLocale, entry), 'utf-8');
      const translated = await openAiTranslate.translate(content, locale, task);
      await fs.mkdir(path.join(contentDir, locale), { recursive: true });
      await fs.writeFile(path.join(contentDir, locale, entry), translated, 'utf-8');
      task.title = `Translated ${missingEntry}.`;
    },
  });
}

await listr.run();

log(picocolors.green('✓ Completed translation.')); 
