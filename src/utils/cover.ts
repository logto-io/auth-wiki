import type { Browser } from "playwright";
import logoDark from "../../public/logo-dark.svg?raw";

/** Locales that require a specific font. The value is the font suffix for Noto Sans. */
const localeFonts: Readonly<Record<string, string>> = Object.freeze({
  ar: 'Arabic',
  ko: 'KR',
  zh: 'SC',
  'zh-hant': 'TC',
})

export const buildCover = async (browser: Browser, title: string, locale: string) => {
  const page = await browser.newPage();
  const fontWeight = 600;
  const additionalFont = localeFonts[locale] ? `&family=Noto+Sans+${localeFonts[locale]}:wght@${fontWeight}` : '';

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">
      <head>
        <meta charset="utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@${fontWeight}${additionalFont}&display=swap');
        </style>
      </head>
      <body>
        <div class="cover" id="cover">
          <div class="eclipse"></div>
          ${logoDark}
          <h1>${title}</h1>
        </div>
        <style>
          :root {
            font-family:
              "Noto Sans",
              ${localeFonts[locale] ? `"Noto Sans ${localeFonts[locale]}",` : ''}
              -apple-system,
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: auto;
          }
          * {
            box-sizing: border-box;
          }
          .cover {
            position: relative;
            width: 1024px;
            height: 576px;
            background-color: #040407;
            display: flex;
            flex-direction: column;
            padding: 72px;
            justify-content: center;
            align-items: start;
            gap: 24px;
          }
          .cover svg {
            height: 52px;
          }
          .cover h1 {
            color: #fff;
            font-size: 64px;
            ${locale === "ar" ? "line-height: 1.6;" : ""}
            font-weight: ${fontWeight};
            margin-block: 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .eclipse {
            position: absolute;
            bottom: -200px;
            left: -180px;
            width: 1000px;
            height: 1000px;
            -webkit-filter: blur(100px);
            filter: blur(100px);
            background: linear-gradient(
              180deg,
              rgba(173, 79, 252, 0) 0%,
              rgb(173, 79, 252) 122%
            );
            opacity: 0.2;
            border-radius: 100%;
          }
        </style>
      </body>
    </html>
  `);
  await page.evaluate(() => document.fonts.ready);
  
  const buffer = await page.locator("#cover").screenshot();
  await page.close();
  return buffer;
}
