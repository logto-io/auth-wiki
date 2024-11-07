import { ar } from './ar';
import { en } from './en';
import { es } from './es';
import { ja } from './ja';
import { ko } from './ko';
import { nl } from './nl';
import { zh } from './zh';

/** Display names for each locale. */
export const localeDisplay: Readonly<Record<string, string>> = Object.freeze({
  ar: 'العربية',
  en: 'English',
  es: 'Español',
  ja: '日本語',
  ko: '한국어',
  nl: 'Nederlands',
  zh: '简体中文',
});

export const getPhrases = (locale: string) => {
  switch (locale) {
    case 'ar':
      return ar;
    case 'en':
      return en;
    case 'es':
      return es;
    case 'ja':
      return ja;
    case 'ko':
      return ko;
    case 'nl':
      return nl;
    case 'zh':
      return zh;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
