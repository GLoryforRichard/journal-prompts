export const INDEXNOW_ORIGIN = 'https://journalprompts.org';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_KEY_PATH = '/indexnow-key.txt';

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

const excludedPaths =
  /^\/(?:api|_next|auth|admin|settings|my-journal|payment|preview|en)(?:\/|$)/;

/** Build a batch from explicitly selected changed pages, never a sitemap crawl. */
export function createIndexNowPayload(
  key: string,
  changedUrls: string[]
): IndexNowPayload {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
    throw new Error('IndexNow ownership key has an invalid format.');
  }

  const urlList = [
    ...new Set(
      changedUrls.map((input) => {
        const url = new URL(input, INDEXNOW_ORIGIN);
        if (
          url.origin !== INDEXNOW_ORIGIN ||
          url.username ||
          url.password ||
          url.search ||
          url.hash
        ) {
          throw new Error(
            'Use canonical HTTPS URLs on journalprompts.org without credentials, queries or fragments.'
          );
        }
        if (excludedPaths.test(decodeURIComponent(url.pathname))) {
          throw new Error(
            'Private, internal and locale-alias URLs are excluded.'
          );
        }
        if (url.pathname.endsWith('/') && url.pathname !== '/') {
          throw new Error('Use page URLs without a trailing slash.');
        }
        if (url.pathname.includes('.')) {
          throw new Error('Submit public page URLs, not files or assets.');
        }
        return url.href;
      })
    ),
  ];

  if (urlList.length === 0 || urlList.length > 10_000) {
    throw new Error('Select between 1 and 10,000 changed page URLs.');
  }

  return {
    host: new URL(INDEXNOW_ORIGIN).host,
    key,
    keyLocation: `${INDEXNOW_ORIGIN}${INDEXNOW_KEY_PATH}`,
    urlList,
  };
}

/** Verify the deployed ownership file before notifying participating engines. */
export async function submitIndexNow(
  payload: IndexNowPayload,
  fetcher: typeof fetch = fetch
): Promise<{ status: 200 | 202; message: string }> {
  const verification = await fetcher(payload.keyLocation, {
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
  });
  if (
    verification.status !== 200 ||
    (await verification.text()).trim() !== payload.key
  ) {
    throw new Error(
      'The live ownership file is missing or does not match. Deploy and verify this release before submitting.'
    );
  }

  const response = await fetcher(INDEXNOW_ENDPOINT, {
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(30_000),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (response.status === 200) {
    return {
      status: 200,
      message: 'URLs received. This does not guarantee crawling or indexing.',
    };
  }
  if (response.status === 202) {
    return {
      status: 202,
      message: 'URLs received; IndexNow ownership validation is still pending.',
    };
  }

  const reasons: Record<number, string> = {
    400: 'Invalid request format.',
    403: 'IndexNow could not verify the ownership key.',
    422: 'A URL or ownership key does not match the host.',
    429: 'Rate limited; wait before retrying and do not resubmit unchanged pages.',
  };
  throw new Error(
    `IndexNow returned HTTP ${response.status}. ${reasons[response.status] ?? 'Check the service before retrying.'}`
  );
}
