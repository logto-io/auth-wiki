import { en } from './en';
import { zh } from './zh';
import { ko } from './ko';
import { ar } from './ar';

/** Display names for each locale. */
export const localeDisplay: Readonly<Record<string, string>> = Object.freeze({
  en: 'English',
  zh: '简体中文',
  ko: '한국어',
  ar: 'العربية',
});

export const getPhrases = (locale: string) => {
  switch (locale) {
    case 'zh':
      return zh;
    case 'en':
      return en;
    case 'ko':
      return ko;
    case 'ar':
      return ar;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
