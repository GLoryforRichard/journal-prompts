import { NextIntlClientProvider } from 'next-intl';
import { type ComponentProps, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import messages from '../../../../messages/en.json';
import LoginPage from './login/page';
import RegisterPage from './register/page';

const browser = vi.hoisted(() => ({ search: '' }));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(browser.search),
}));
vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));
vi.mock('@/i18n/navigation', () => ({
  LocaleLink: ({
    prefetch: _prefetch,
    ...props
  }: ComponentProps<'a'> & { prefetch?: boolean }) => createElement('a', props),
}));
vi.mock('@/components/layout/logo', () => ({ Logo: () => null }));
vi.mock('@/components/shared/captcha', () => ({ Captcha: () => null }));
vi.mock('@/actions/validate-captcha', () => ({
  validateCaptchaAction: vi.fn(),
}));
vi.mock('@/lib/auth-client', () => ({ authClient: {} }));
vi.mock('@/config/website', async (importOriginal) => {
  const { websiteConfig } =
    await importOriginal<typeof import('@/config/website')>();
  return {
    websiteConfig: {
      ...websiteConfig,
      price: {
        ...websiteConfig.price,
        plans: {
          ...websiteConfig.price.plans,
          pro: {
            ...websiteConfig.price.plans.pro,
            prices: websiteConfig.price.plans.pro.prices.map((price) => ({
              ...price,
              priceId: `test_pro_${price.interval}`,
            })),
          },
        },
      },
    },
  };
});

function authCallbacks(html: string) {
  return [...html.matchAll(/href="([^"]+)"/g)]
    .map(
      (match) =>
        new URL(match[1].replaceAll('&amp;', '&'), 'https://test.invalid')
    )
    .filter((url) => url.pathname.startsWith('/auth/'))
    .map((url) => url.searchParams.get('callbackUrl'));
}

describe.each([
  ['login', LoginPage],
  ['register', RegisterPage],
] as const)('%s callback rendering', (_name, Page) => {
  beforeEach(() => {
    browser.search = '';
  });

  async function render(callbackUrl?: string | string[]) {
    const page = await Page({
      searchParams: Promise.resolve({ callbackUrl }),
    });
    return renderToStaticMarkup(
      createElement(NextIntlClientProvider, {
        locale: 'en',
        messages,
        timeZone: 'UTC',
        // biome-ignore lint/correctness/noChildrenProp: The provider requires children in its createElement props type.
        children: page,
      })
    );
  }

  it.each([
    ['month', '$9.99', '$39.99'],
    ['year', '$39.99', '$9.99'],
  ])('preserves %s billing before and after client URL recovery', async (interval, amount, otherAmount) => {
    const callback = `/pricing?plan=pro&interval=${interval}`;
    // Production's initial canonical URL splits the nested interval parameter.
    // Page searchParams remains intact, as does location.search after hydration.
    browser.search = `callbackUrl=%2Fpricing%3Fplan%3Dpro&interval=${interval}`;
    const initial = await render(callback);
    browser.search = new URLSearchParams({ callbackUrl: callback }).toString();
    const recovered = await render(callback);

    for (const html of [initial, recovered]) {
      expect(html).toContain(amount);
      expect(html).not.toContain(otherAmount);
      expect(authCallbacks(html).length).toBeGreaterThanOrEqual(2);
      expect(authCallbacks(html).every((value) => value === callback)).toBe(
        true
      );
    }
    expect(initial).toBe(recovered);
  });

  it('keeps the first repeated callback without losing its nested query', async () => {
    const callback = '/en/pricing?plan=pro&interval=month&checkout=canceled';
    const html = await render([callback, '/pricing?plan=pro&interval=year']);
    expect(html).toContain('$9.99');
    expect(authCallbacks(html).every((value) => value === callback)).toBe(true);
  });

  it.each([
    undefined,
    'https://external.invalid/pricing?plan=pro&interval=month',
    '//external.invalid',
    '/%2fexternal.invalid',
    '/auth/login',
  ])('retains the safe journal fallback for %s', async (callback) => {
    const html = await render(callback);
    expect(html).not.toContain('$9.99');
    expect(html).not.toContain('$39.99');
    expect(authCallbacks(html).every((value) => value === '/my-journal')).toBe(
      true
    );
  });
});
