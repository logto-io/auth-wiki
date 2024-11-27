import { ar } from './ar';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { ja } from './ja';
import { ko } from './ko';
import { nl } from './nl';
import { ptBr } from './pt-br';
import { ptPt } from './pt-pt';
import { zh } from './zh';
import { zhHant } from './zh-hant';

/** Display names for each locale. */
export const localeDisplay: Readonly<Record<string, string>> = Object.freeze({
  ar: 'العربية',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  nl: 'Nederlands',
  'pt-br': 'Português (Brasil)',
  'pt-pt': 'Português (Portugal)',
  zh: '简体中文',
  'zh-hant': '繁體中文',
});

export const getPhrases = (locale: string) => {
  switch (locale) {
    case 'ar':
      return ar;
    case 'de':
      return de;
    case 'en':
      return en;
    case 'es':
      return es;
    case 'fr':
      return fr;
    case 'it':
      return it;
    case 'ja':
      return ja;
    case 'ko':
      return ko;
    case 'nl':
      return nl;
    case 'pt-br':
      return ptBr;
    case 'pt-pt':
      return ptPt;
    case 'zh':
      return zh;
    case 'zh-hant':
      return zhHant;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
