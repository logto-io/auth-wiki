import { en } from './en';
import { es } from './es';
import { zh } from './zh';
import { ko } from './ko';
import { ar } from './ar';
import { ja } from './ja';

/** Display names for each locale. */
export const localeDisplay: Readonly<Record<string, string>> = Object.freeze({
  en: 'English',
  zh: '简体中文',
  es: 'Español',
  ko: '한국어',
  ar: 'العربية',
  ja: '日本語',
});

export const getPhrases = (locale: string) => {
  switch (locale) {
    case 'zh':
      return zh;
    case 'es':
      return es;
    case 'en':
      return en;
    case 'ko':
      return ko;
    case 'ar':
      return ar;
    case 'ja':
      return ja;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
