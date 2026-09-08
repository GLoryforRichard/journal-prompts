import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import {
  INDEXNOW_ENDPOINT,
  createIndexNowPayload,
  submitIndexNow,
} from './indexnow';

const testKey = 'indexnow-test-ownership-key';

describe('IndexNow change notifications', () => {
  it('deduplicates canonical production paths and validates the shipped ownership file', () => {
    const key = readFileSync(
      new URL('../../public/indexnow-key.txt', import.meta.url),
      'utf8'
    ).trim();
    const payload = createIndexNowPayload(key, [
      '/pricing',
      'https://journalprompts.org/pricing',
      '/',
    ]);
    expect(payload.urlList).toEqual([
      'https://journalprompts.org/pricing',
      'https://journalprompts.org/',
    ]);
    expect(payload.keyLocation).toBe(
      'https://journalprompts.org/indexnow-key.txt'
    );
  });

  it.each([
    'https://example.com/pricing',
    '//example.com/pricing',
    'https://www.journalprompts.org/pricing',
    'http://journalprompts.org/pricing',
    'https://user:password@journalprompts.org/pricing',
    '/pricing?utm_source=bing',
    '/pricing#plans',
    '/pricing/',
    '/api/auth/session',
    '/my-journal',
    '/my-journal/entry',
    '/%61dmin/users',
    '/payment',
    '/en/pricing',
    '/indexnow-key.txt',
  ])('rejects noncanonical or private input %s', (url) => {
    expect(() => createIndexNowPayload(testKey, [url])).toThrow();
  });

  it('rejects empty and oversized batches', () => {
    expect(() => createIndexNowPayload(testKey, [])).toThrow();
    expect(() =>
      createIndexNowPayload(
        testKey,
        Array.from({ length: 10_001 }, (_, i) => `/page-${i}`)
      )
    ).toThrow();
  });

  it.each([
    new Response('not found', { status: 404 }),
    new Response('another-release-key', { status: 200 }),
  ])('does not send URLs until the deployed key matches', async (response) => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValueOnce(response);
    await expect(
      submitIndexNow(createIndexNowPayload(testKey, ['/pricing']), fetcher)
    ).rejects.toThrow('live ownership file');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('reports 202 as ownership validation pending, not indexed', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(`${testKey}\n`, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 202 }));
    const payload = createIndexNowPayload(testKey, ['/pricing']);
    const result = await submitIndexNow(payload, fetcher);
    expect(result).toEqual({
      status: 202,
      message: expect.stringContaining('pending'),
    });
    expect(fetcher).toHaveBeenLastCalledWith(
      INDEXNOW_ENDPOINT,
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) })
    );
  });

  it('does not automatically retry a rate-limited submission', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(testKey))
      .mockResolvedValueOnce(new Response(null, { status: 429 }));
    await expect(
      submitIndexNow(createIndexNowPayload(testKey, ['/pricing']), fetcher)
    ).rejects.toThrow('Rate limited');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
