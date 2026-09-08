import { readFile } from 'node:fs/promises';
import {
  INDEXNOW_ENDPOINT,
  createIndexNowPayload,
  submitIndexNow,
} from '../src/lib/indexnow';

async function main() {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  if (args.length === 0 || args.includes('--help')) {
    console.log(`Preview a batch of newly added, updated or deleted public pages:
  pnpm indexnow /pricing /daily-journal-prompts
  pnpm indexnow --file docs/seo/indexnow-release-urls.txt

After deploying the release, send the reviewed batch:
  pnpm indexnow --submit /pricing /daily-journal-prompts

Only --submit performs network requests. It verifies the live ownership file
before submission. Do not submit unchanged historical pages or a whole sitemap.`);
    return;
  }

  const urls: string[] = [];
  let submit = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--submit') {
      submit = true;
    } else if (arg === '--file') {
      const path = args[++index];
      if (!path || path.startsWith('--')) {
        throw new Error('--file requires a path to a UTF-8 URL list.');
      }
      const lines = (await readFile(path, 'utf8')).split(/\r?\n/);
      urls.push(
        ...lines
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith('#'))
      );
    } else if (arg.startsWith('--')) {
      throw new Error('Unknown option. Run pnpm indexnow --help for usage.');
    } else {
      urls.push(arg);
    }
  }

  const key = (
    await readFile(
      new URL('../public/indexnow-key.txt', import.meta.url),
      'utf8'
    )
  ).trim();
  const payload = createIndexNowPayload(key, urls);
  console.log(
    `${submit ? 'Submitting' : 'Dry run'}: ${payload.urlList.length} changed page(s)`
  );
  console.log(`Endpoint: ${INDEXNOW_ENDPOINT}`);
  for (const url of payload.urlList) console.log(url);

  if (!submit) {
    console.log(
      'No requests sent. Deploy first, then use --submit for this reviewed batch.'
    );
    return;
  }

  const result = await submitIndexNow(payload);
  console.log(`HTTP ${result.status}: ${result.message}`);
}

main().catch((error: unknown) => {
  // Never log a fetch error object, request body, or ownership-key contents.
  console.error(
    error instanceof Error ? error.message : 'IndexNow submission failed.'
  );
  process.exitCode = 1;
});
