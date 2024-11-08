export const trimEnd = (str: string, suffix: string) => str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
