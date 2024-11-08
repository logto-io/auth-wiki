import { describe, expect, it } from "vitest";
import { getLocaleFromUrl, getLocaleUrl } from "./locale";

describe('getLocaleFromUrl', () => {
  const domain = 'https://example.com';
  it('should return the locale from the URL', () => {
    expect(getLocaleFromUrl(domain + '/en')).toBe('en');
    expect(getLocaleFromUrl(domain + '/en/')).toBe('en');
    expect(getLocaleFromUrl(domain + '/en/foo/bar')).toBe('en');
    expect(getLocaleFromUrl(new URL('/en/foo/bar', domain))).toBe('en');
    expect(getLocaleFromUrl(new URL('/ko/foo/bar', domain))).toBe('ko');
    expect(getLocaleFromUrl(domain + '/zh-hant/')).toBe('zh-hant');
    expect(getLocaleFromUrl(domain + '/zh-hant.html')).toBe('zh-hant');
    expect(getLocaleFromUrl(domain + '/zh-hant/foo.css')).toBe('zh-hant');
  });

  it('should return the default locale if the URL does not contain a locale', () => {
    expect(getLocaleFromUrl(domain)).toBe('en');
    expect(getLocaleFromUrl(domain + '/foo/bar')).toBe('en');
    // Case-sensitive
    expect(getLocaleFromUrl(new URL('/zh-Hant/foo/bar', domain))).toBe('en');
    expect(getLocaleFromUrl(new URL('/aa/foo/bar', domain))).toBe('en');
    expect(getLocaleFromUrl(new URL('/aa.html', domain))).toBe('en');
  });
});

describe('getLocaleUrl', () => {
  const domain = 'https://example.com';
  it('should return the URL with the new locale', () => {
    expect(getLocaleUrl(domain + '/en/foo/bar', 'zh-hant')).toBe(domain + '/zh-hant/foo/bar');
    expect(getLocaleUrl(domain + '/en/foo/bar', 'en')).toBe(domain + '/foo/bar');
    expect(getLocaleUrl(domain + '/foo/bar', 'zh-hant')).toBe(domain + '/zh-hant/foo/bar');
    expect(getLocaleUrl(domain + '/foo/bar', 'en')).toBe(domain + '/foo/bar');
    expect(getLocaleUrl(domain, 'zh-hant')).toBe(domain + '/zh-hant');
    expect(getLocaleUrl(domain, 'en')).toBe(domain + '/');
    expect(getLocaleUrl(domain + '/en/foo/bar.html', 'zh-hant')).toBe(domain + '/zh-hant/foo/bar');
    expect(getLocaleUrl(domain + '/en.html', 'zh-hant')).toBe(domain + '/zh-hant');
    expect(getLocaleUrl(domain + '/en.css', 'en')).toBe(domain + '/');
  });

  it('should work with pathname strings', () => {
    expect(getLocaleUrl('/en/foo/bar', 'zh-hant')).toBe('/zh-hant/foo/bar');
    expect(getLocaleUrl('/en/foo/bar', 'en')).toBe('/foo/bar');
    expect(getLocaleUrl('/foo/bar', 'zh-hant')).toBe('/zh-hant/foo/bar');
    expect(getLocaleUrl('/foo/bar', 'en')).toBe('/foo/bar');
    expect(getLocaleUrl('/', 'zh-hant')).toBe('/zh-hant');
    expect(getLocaleUrl('/', 'en')).toBe('/');
    expect(getLocaleUrl('/en/foo/bar.html', 'zh-hant')).toBe('/zh-hant/foo/bar');
    expect(getLocaleUrl('/en.html', 'zh-hant')).toBe('/zh-hant');
    expect(getLocaleUrl('/en.css', 'en')).toBe('/');
  });

  it('should throw an error if the pathname does not start with a slash', () => {
    expect(() => getLocaleUrl('en/foo/bar', 'zh-hant')).toThrowError('Pathname must start with a slash');
  });
});
