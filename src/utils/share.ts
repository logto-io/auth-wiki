export const twitterShareUrl = 'https://x.com/share/';
export const linkedInShareUrl = 'https://www.linkedin.com/sharing/share-offsite/';
export const hackerNewsShareUrl = 'https://news.ycombinator.com/submitlink';
export const redditShareUrl = 'https://www.reddit.com/web/submit/';

const getShareText = (title: string) => `🤔 Check out this article on auth.wiki: ${title}`;

export const buildTwitterShareUrl = (url: string, title: string) => {
  const shareUrl = new URL(twitterShareUrl);
  shareUrl.searchParams.set('url', url);
  shareUrl.searchParams.set('text', getShareText(title));

  return shareUrl.href;
};

export const buildLinkedInShareUrl = (url: string) => {
  const shareUrl = new URL(linkedInShareUrl);
  shareUrl.searchParams.set('url', url);

  return shareUrl.href;
};

export const buildHackerNewsShareUrl = (url: string, title: string) => {
  // HackerNews doesn't support modern search params
  return `${hackerNewsShareUrl}?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;
};

export const buildRedditShareUrl = (url: string, title: string) => {
  const shareUrl = new URL(redditShareUrl);
  shareUrl.searchParams.set('url', url);
  shareUrl.searchParams.set('title', title);

  return shareUrl.href;
};


export const buildShareUrlMap: Readonly<Record<string, (url: string, title: string) => string>> = Object.freeze({
  x: buildTwitterShareUrl,
  'linked-in': buildLinkedInShareUrl,
  'hacker-news': buildHackerNewsShareUrl,
  reddit: buildRedditShareUrl,
})
