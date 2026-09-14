'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isProductionAnalyticsHost, trackPageView } from '@/lib/analytics';

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
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  useEffect(() => {
    setEnabled(isProductionAnalyticsHost() && !!analyticsId);
    trackPageView();
  }, [pathname, analyticsId]);

  if (!enabled || !analyticsId) return null;

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
      strategy="lazyOnload"
    />
  );
}
