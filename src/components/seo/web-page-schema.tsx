import { SITE_NAME } from '@/config/site-facts';
import { getBaseUrl } from '@/lib/urls';

interface WebPageSchemaProps {
  type?: 'WebPage' | 'CollectionPage';
  name: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  /** Rendered as an ItemList, e.g. the prompts on a collection page. */
  items?: string[];
}

export function WebPageSchema({
  type = 'WebPage',
  name,
  description,
  path,
  datePublished,
  dateModified,
  items,
}: WebPageSchemaProps) {
  const baseUrl = getBaseUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: `${baseUrl}${path}`,
    inLanguage: 'en',
    datePublished,
    dateModified,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: baseUrl },
    ...(items?.length && {
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item,
        })),
      },
    }),
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
