import type { Browser } from "playwright";
import logoDark from "../../public/logo-dark.svg?raw";

export const buildCover = async (browser: Browser, title: string) => {
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
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
              "system-ui",
              -apple-system,
              "Segoe UI",
              Roboto,
              Oxygen,
              Ubuntu,
              Cantarell,
              "Fira Sans",
              "Droid Sans",
              "Helvetica Neue",
              sans-serif,
              "System Default";
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: auto;
          }
          * {
            box-sizing: border-box;
          }
          .cover {
            position: relative;
            width: 1024px;
            height: 768px;
            background-color: #040407;
            display: flex;
            flex-direction: column;
            padding: 64px;
            justify-content: center;
            align-items: start;
            gap: 32px;
          }
          .cover svg {
            height: 64px;
          }
          .cover h1 {
            color: #fff;
            font-size: 72px;
            font-weight: 700;
            margin-block: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
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
  
  const buffer = await page.locator("#cover").screenshot();
  await page.close();
  return buffer;
}
