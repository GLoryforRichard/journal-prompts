import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/source', () => ({
  blogSource: { getPages: () => [] },
}));

import { focusedPromptPages } from '@/data/focused-prompt-pages';
import { scenes } from '@/data/scenes';
import { activeTechniqueSlugs } from '@/data/techniques';
import { getLlmsFullText, getLlmsText } from './llms';
import { getBaseUrl } from './urls';

const publicPaths = new Set([
  '/',
  '/find-your-prompt',
  '/pricing',
  '/techniques',
  '/llms-full.txt',
  ...scenes.map((scene) => `/${scene.slug}`),
  ...focusedPromptPages.map((page) => `/${page.slug}`),
  ...activeTechniqueSlugs.map((slug) => `/techniques/${slug}`),
]);

function linkedPaths(text: string) {
  const base = getBaseUrl();
  return [...text.matchAll(/https?:\/\/[^\s),]+/g)].map((match) => {
    const path = match[0].slice(base.length);
    return path === '' ? '/' : path;
  });
}

describe('llms.txt', () => {
  it('only points assistants at pages that exist', () => {
    const paths = linkedPaths(getLlmsText());
    expect(paths.length).toBeGreaterThan(30);
    expect(paths.filter((path) => !publicPaths.has(path))).toEqual([]);
  });

  it('lists every topic and collection page', () => {
    const paths = new Set(linkedPaths(getLlmsText()));
    for (const path of publicPaths) {
      if (path === '/pricing' || path === '/llms-full.txt') continue;
      expect(paths, path).toContain(path);
    }
  });

  it('repeats each scene FAQ answer word for word', () => {
    const full = getLlmsFullText();
    for (const scene of scenes) {
      for (const faq of scene.faqs) {
        expect(full).toContain(`Q: ${faq.question}\nA: ${faq.answer}`);
      }
    }
  });
});
