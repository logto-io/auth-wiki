import fs from "node:fs/promises";
import ogs from "open-graph-scraper";

type OgsResult = Awaited<ReturnType<typeof ogs>>;

export type OpenGraphMetadata = {
  url: string;
  result: OgsResult["result"];
};

const cachePath = ".og-cache.json";
// Retries wait 2s, 4s, ..., 64s (about 2 minutes in total) to outlast a typical rate-limit window.
const maxRetries = 6;
const baseRetryDelayMs = 2000;

const readCache = async (): Promise<Map<string, OpenGraphMetadata>> => {
  try {
    return new Map(JSON.parse(await fs.readFile(cachePath, "utf-8")));
  } catch {
    return new Map();
  }
};

// Module state is shared by every page rendered in a build, so the cache file is read once and
// each URL is fetched at most once.
const cache = readCache();
const requests = new Map<string, Promise<OpenGraphMetadata>>();
let cacheWrite: Promise<void> = Promise.resolve();

// Writes are chained so they never interleave, and each one saves the whole in-memory cache.
const writeCache = (entries: Map<string, OpenGraphMetadata>) => {
  cacheWrite = cacheWrite.then(async () =>
    fs.writeFile(cachePath, JSON.stringify([...entries])),
  );
  return cacheWrite;
};

// 4xx responses other than 408 and 429 mean the link is broken, so retrying won't help.
const isPermanentFailure = (reason: string) => /^4(?!08|29)\d\d /.test(reason);

const scrape = async (
  url: string,
  attempt = 0,
): Promise<OgsResult["result"]> => {
  // `ogs` rejects with an error result object rather than an `Error`.
  const { error, result } = await ogs({ url }).catch(
    (rejection: OgsResult) => rejection,
  );
  if (!error) {
    return result;
  }

  const reason = result.error ?? "unknown error";
  if (attempt >= maxRetries || isPermanentFailure(reason)) {
    throw new Error(`Failed to fetch Open Graph data for ${url}: ${reason}`);
  }

  const delay = baseRetryDelayMs * 2 ** attempt;
  console.warn(`Open Graph fetch for ${url} failed (${reason}), retrying in ${delay}ms.`);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return scrape(url, attempt + 1);
};

const resolveMetadata = async (url: string): Promise<OpenGraphMetadata> => {
  const entries = await cache;
  const cached = entries.get(url);
  if (cached) {
    return cached;
  }

  const result = await scrape(url);
  if (!result.ogTitle) {
    throw new Error(`The Open Graph data for ${url} does not contain a title.`);
  }

  const metadata = { url, result };
  entries.set(url, metadata);
  await writeCache(entries);
  return metadata;
};

/**
 * Get the Open Graph metadata of a URL from `.og-cache.json`, or fetch it with exponential
 * backoff retries for failures other than broken-link 4xx responses (e.g. 429, 5xx, timeouts).
 */
export const getOpenGraphMetadata = (url: string): Promise<OpenGraphMetadata> => {
  const existing = requests.get(url);
  if (existing) {
    return existing;
  }

  const request = resolveMetadata(url);
  requests.set(url, request);
  // Forget failures so a later render (e.g. a page reload in dev) can try again.
  request.catch(() => requests.delete(url));
  return request;
};
