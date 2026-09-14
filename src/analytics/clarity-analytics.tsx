'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { isProductionAnalyticsHost } from '@/lib/analytics';

/**
 * Clarity Analytics
 *
 * https://clarity.microsoft.com
 * https://mksaas.com/docs/analytics#clarity
 */
export default function ClarityAnalytics() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(isProductionAnalyticsHost()), []);

  // Preserve the site's existing project when no build-time override is set.
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'w0uzbho8i6';
  if (!enabled) return null;

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="lazyOnload"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Microsoft Clarity requires inline script
      dangerouslySetInnerHTML={{
        __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${projectId}");
                `,
      }}
    />
  );
}
