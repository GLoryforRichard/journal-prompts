import { SITE_NAME } from '@/config/site-facts';
import { websiteConfig } from '@/config/website';
import { getBaseUrl, getImageUrl } from '@/lib/urls';

/** WebSite + Organization, so search engines and assistants name the site consistently. */
export function SiteSchema({ description }: { description: string }) {
  const baseUrl = getBaseUrl();
  const organization = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: SITE_NAME,
    url: `${baseUrl}/`,
    logo: getImageUrl(websiteConfig.metadata.images?.logoLight ?? '/logo.png'),
    email: websiteConfig.mail.supportEmail,
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: SITE_NAME,
        url: `${baseUrl}/`,
        description,
        inLanguage: 'en',
        publisher: { '@id': organization['@id'] },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from our own page data; `<` is escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
