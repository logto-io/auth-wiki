export * from './en';
export * from './zh';

import { en } from './en';
import { zh } from './zh';

/** Display names for each locale. */
export const localeDisplay: Readonly<Record<string, string>> = Object.freeze({
  en: 'English',
  zh: '简体中文',
});

export const getPhrases = (locale: string) => {
  switch (locale) {
    case 'zh':
      return zh;
    case 'en':
      return en;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
