export * from './en';
export * from './zh';

import { en } from './en';
import { zh } from './zh';

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
