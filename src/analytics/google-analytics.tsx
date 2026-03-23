'use client';

import Script from 'next/script';

/**
 * Google Analytics — deferred loading
 *
 * Uses lazyOnload strategy to avoid blocking LCP.
 * Scripts load after the page is fully interactive.
 *
 * https://analytics.google.com
 * https://nextjs.org/docs/app/building-your-application/optimizing/scripts
 */
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!analyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsId}');
        `}
      </Script>
    </>
  );
}
