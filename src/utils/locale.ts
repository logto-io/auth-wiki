import { defaultLocale, locales } from "astro-i18n-aut";

const trimExtension = (path: string) => {
  return path.replace(/\.[^/.]+$/, '');
}

export function getLocaleFromUrl(url: URL | string) {
  const [, lang] = trimExtension(new URL(url).pathname).split('/');
  if (lang && lang in locales) {
    return lang;
  }
  return defaultLocale;
}

const getPathnameWithoutLocale = (pathname: string) => {
  if (!pathname.startsWith('/')) {
    throw new Error('Pathname must start with a slash');
  }

  const [_, pathLocale, ...segments] = pathname.split('/');

  if (pathLocale && pathLocale in locales) {
    return '/' + segments.join('/');
  }
  return pathname;
}

const trimTrailSlash = (pathname: string) => {
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export const getLocaleUrl = (url: URL | string, locale: string) => {
  const isInputPathname = typeof url === 'string' && (url.startsWith('/') || !url.includes(':/'));
  const pathname = getPathnameWithoutLocale(
    trimExtension(isInputPathname ? url : new URL(url).pathname)
  );
  
  const newPathname = trimTrailSlash(locale === defaultLocale ? pathname : `/${locale}${pathname}`);
  if (isInputPathname) {
    return newPathname;
  }

  const urlObj = new URL(url);
  urlObj.pathname = newPathname;
  return urlObj.href;
}
