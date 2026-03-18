import { websiteConfig } from '@/config/website';
import { getLocalePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { generateHreflangUrls } from '@/lib/hreflang';
import { blogSource, categorySource, source } from '@/lib/source';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';
import { getBaseUrl } from '@/lib/urls';

type Href = Parameters<typeof getLocalePathname>[0]['href'];

/**
 * Scene slugs for journal prompt topic pages
 */
const sceneRoutes = [
  '/gratitude-journal-prompts',
  '/journal-prompts-for-mental-health',
  '/shadow-work-journal-prompts',
  '/journal-prompts-for-kids',
  '/daily-journal-prompts',
  '/journal-prompts-for-teens',
  '/self-discovery-journal-prompts',
  '/self-love-journal-prompts',
  '/mindfulness-journal-prompts',
  '/morning-journal-prompts',
  '/fun-journal-prompts',
  '/deep-journal-prompts',
  '/journal-prompts-for-middle-school',
  '/journal-prompts-for-high-school',
];

/**
 * static routes for sitemap
 */
const staticRoutes = [
  '/',
  '/privacy',
  '/terms',
  '/about',
  '/find-your-prompt',
  ...sceneRoutes,
  ...(websiteConfig.blog.enable ? ['/blog'] : []),
  ...(websiteConfig.docs.enable ? ['/docs'] : []),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapList: MetadataRoute.Sitemap = [];

  // add static routes
  sitemapList.push(
    ...staticRoutes.flatMap((route) => {
      return routing.locales.map((locale) => ({
        url: getUrl(route, locale),
        alternates: {
          languages: generateHreflangUrls(route),
        },
      }));
    })
  );

  // add blog related routes if enabled
  if (websiteConfig.blog.enable) {
    routing.locales.forEach((locale) => {
      const posts = blogSource
        .getPages(locale)
        .filter((post) => post.data.published);
      const totalPages = Math.max(
        1,
        Math.ceil(posts.length / websiteConfig.blog.paginationSize)
      );
      for (let page = 2; page <= totalPages; page++) {
        sitemapList.push({
          url: getUrl(`/blog/page/${page}`, locale),
          alternates: {
            languages: generateHreflangUrls(`/blog/page/${page}`),
          },
        });
      }
    });

    routing.locales.forEach((locale) => {
      const localeCategories = categorySource.getPages(locale);
      localeCategories.forEach((category) => {
        const postsInCategory = blogSource
          .getPages(locale)
          .filter((post) => post.data.published)
          .filter((post) =>
            post.data.categories.some((cat) => cat === category.slugs[0])
          );
        const totalPages = Math.max(
          1,
          Math.ceil(postsInCategory.length / websiteConfig.blog.paginationSize)
        );
        sitemapList.push({
          url: getUrl(`/blog/category/${category.slugs[0]}`, locale),
          alternates: {
            languages: generateHreflangUrls(
              `/blog/category/${category.slugs[0]}`
            ),
          },
        });
        for (let page = 2; page <= totalPages; page++) {
          sitemapList.push({
            url: getUrl(
              `/blog/category/${category.slugs[0]}/page/${page}`,
              locale
            ),
            alternates: {
              languages: generateHreflangUrls(
                `/blog/category/${category.slugs[0]}/page/${page}`
              ),
            },
          });
        }
      });
    });

    routing.locales.forEach((locale) => {
      const posts = blogSource
        .getPages(locale)
        .filter((post) => post.data.published);
      posts.forEach((post) => {
        sitemapList.push({
          url: getUrl(`/blog/${post.slugs.join('/')}`, locale),
          alternates: {
            languages: generateHreflangUrls(`/blog/${post.slugs.join('/')}`),
          },
        });
      });
    });
  }

  // add docs related routes if enabled
  if (websiteConfig.docs.enable) {
    const docsParams = source.generateParams();
    sitemapList.push(
      ...docsParams.flatMap((param) =>
        routing.locales.map((locale) => ({
          url: getUrl(`/docs/${param.slug.join('/')}`, locale),
          alternates: {
            languages: generateHreflangUrls(`/docs/${param.slug.join('/')}`),
          },
        }))
      )
    );
  }

  return sitemapList;
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getLocalePathname({ locale, href });
  return getBaseUrl() + pathname;
}
