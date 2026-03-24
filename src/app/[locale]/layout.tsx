import { Analytics } from '@/analytics/analytics';
import {
  fontBricolageGrotesque,
  fontKalam,
  fontNotoSans,
  fontNotoSansMono,
  fontNotoSerif,
  fontPatrickHand,
} from '@/assets/fonts';
import AffonsoScript from '@/components/affiliate/affonso';
import PromotekitScript from '@/components/affiliate/promotekit';
import { TailwindIndicator } from '@/components/layout/tailwind-indicator';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { type Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';

import '@/styles/globals.css';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

/**
 * 1. Locale Layout
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#layout
 *
 * 2. NextIntlClientProvider
 * https://next-intl.dev/docs/usage/configuration#nextintlclientprovider
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this layout
  // https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#static-rendering
  setRequestLocale(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="og9jowYC7fqZFvZ3Se5tKjucZg-O03lHSvqNVKIcgBQ"
        />
      </head>
      <body
        className={cn(
          'size-full antialiased',
          fontNotoSans.className,
          fontNotoSerif.variable,
          fontNotoSansMono.variable,
          fontBricolageGrotesque.variable,
          fontKalam.variable,
          fontPatrickHand.variable
        )}
      >
        <NuqsAdapter>
          <NextIntlClientProvider>
            <Providers>
              {children}

              <Toaster richColors position="top-right" offset={64} />
              <TailwindIndicator />
              <Analytics />
              <Script
                id="clarity-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "w0uzbho8i6");`,
                }}
              />
              <AffonsoScript />
              <PromotekitScript />
            </Providers>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
