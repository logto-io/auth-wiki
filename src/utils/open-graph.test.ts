import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ogs = vi.hoisted(() => vi.fn());
const fs = vi.hoisted(() => ({ readFile: vi.fn(), writeFile: vi.fn() }));

vi.mock("open-graph-scraper", () => ({ default: ogs }));
vi.mock("node:fs/promises", () => ({ default: fs }));

const url = "https://example.com/article";
const success = (ogTitle?: string) => ({ error: false, result: { ogTitle } });
const failure = (error: string) => ({
  error: true,
  result: { success: false, error },
});

// The module keeps per-build state, so each test loads a fresh copy.
const loadGetOpenGraphMetadata = async () => {
  vi.resetModules();
  const { getOpenGraphMetadata } = await import("./open-graph");
  return getOpenGraphMetadata;
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  ogs.mockReset();
  fs.readFile.mockReset().mockRejectedValue(new Error("ENOENT"));
  fs.writeFile.mockReset().mockResolvedValue(undefined);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("getOpenGraphMetadata", () => {
  it("fetches each URL once across concurrent callers", async () => {
    ogs.mockResolvedValue(success("Title"));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    const [first, second] = await Promise.all([
      getOpenGraphMetadata(url),
      getOpenGraphMetadata(url),
    ]);

    expect(first).toEqual({ url, result: { ogTitle: "Title" } });
    expect(second).toBe(first);
    expect(ogs).toHaveBeenCalledTimes(1);
  });

  it("uses entries from the cache file without fetching", async () => {
    const cached = { url, result: { ogTitle: "Cached" } };
    fs.readFile.mockResolvedValue(JSON.stringify([[url, cached]]));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    await expect(getOpenGraphMetadata(url)).resolves.toEqual(cached);
    expect(ogs).not.toHaveBeenCalled();
  });

  it("writes every fetched entry to the cache file", async () => {
    ogs.mockResolvedValue(success("Title"));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    await Promise.all([
      getOpenGraphMetadata(url),
      getOpenGraphMetadata("https://example.com/other"),
    ]);

    const written = JSON.parse(fs.writeFile.mock.lastCall?.[1]);
    expect(written.map(([key]: [string]) => key)).toEqual([
      url,
      "https://example.com/other",
    ]);
  });

  it("retries rate-limited requests", async () => {
    ogs
      .mockRejectedValueOnce(failure("429 Too Many Requests"))
      .mockResolvedValue(success("Title"));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    const request = getOpenGraphMetadata(url);
    await vi.runAllTimersAsync();

    await expect(request).resolves.toEqual({ url, result: { ogTitle: "Title" } });
    expect(ogs).toHaveBeenCalledTimes(2);
  });

  it("fails after the last retry", async () => {
    ogs.mockRejectedValue(failure("503 Service Unavailable"));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    const assertion = expect(getOpenGraphMetadata(url)).rejects.toThrow(
      "503 Service Unavailable",
    );
    await vi.runAllTimersAsync();

    await assertion;
    expect(ogs).toHaveBeenCalledTimes(7);
  });

  it("does not retry broken links", async () => {
    ogs.mockRejectedValue(failure("404 Not Found"));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    await expect(getOpenGraphMetadata(url)).rejects.toThrow("404 Not Found");
    expect(ogs).toHaveBeenCalledTimes(1);
  });

  it("fetches again after a failed request", async () => {
    ogs
      .mockRejectedValueOnce(failure("404 Not Found"))
      .mockResolvedValue(success("Title"));
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    await expect(getOpenGraphMetadata(url)).rejects.toThrow("404 Not Found");
    await expect(getOpenGraphMetadata(url)).resolves.toEqual({
      url,
      result: { ogTitle: "Title" },
    });
    expect(ogs).toHaveBeenCalledTimes(2);
  });

  it("fails when the page has no Open Graph title", async () => {
    ogs.mockResolvedValue(success());
    const getOpenGraphMetadata = await loadGetOpenGraphMetadata();

    await expect(getOpenGraphMetadata(url)).rejects.toThrow(
      "does not contain a title",
    );
  });
});
