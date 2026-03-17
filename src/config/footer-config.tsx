'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

export function useFooterLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.footer');

  return [
    {
      title: 'Popular Topics',
      items: [
        { title: 'Gratitude', href: '/gratitude-journal-prompts', external: false },
        { title: 'Mental Health', href: '/journal-prompts-for-mental-health', external: false },
        { title: 'Shadow Work', href: '/shadow-work-journal-prompts', external: false },
        { title: 'Self-Discovery', href: '/self-discovery-journal-prompts', external: false },
        { title: 'Self-Love', href: '/self-love-journal-prompts', external: false },
      ],
    },
    {
      title: 'More Topics',
      items: [
        { title: 'Daily Prompts', href: '/daily-journal-prompts', external: false },
        { title: 'Morning Prompts', href: '/morning-journal-prompts', external: false },
        { title: 'Mindfulness', href: '/mindfulness-journal-prompts', external: false },
        { title: 'Deep Prompts', href: '/deep-journal-prompts', external: false },
        { title: 'Fun Prompts', href: '/fun-journal-prompts', external: false },
      ],
    },
    {
      title: 'For Students',
      items: [
        { title: 'For Kids', href: '/journal-prompts-for-kids', external: false },
        { title: 'For Teens', href: '/journal-prompts-for-teens', external: false },
        { title: 'Middle School', href: '/journal-prompts-for-middle-school', external: false },
        { title: 'High School', href: '/journal-prompts-for-high-school', external: false },
      ],
    },
    {
      title: t('legal.title'),
      items: [
        {
          title: t('legal.items.privacyPolicy'),
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('legal.items.termsOfService'),
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
