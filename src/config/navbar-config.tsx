'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  HeartIcon,
  BrainIcon,
  MoonIcon,
  BabyIcon,
  CalendarIcon,
  GraduationCapIcon,
  CompassIcon,
  HeartHandshakeIcon,
  LeafIcon,
  SunriseIcon,
  SmileIcon,
  LayersIcon,
  SchoolIcon,
  ShieldCheckIcon,
  FileTextIcon,
  PenToolIcon,
  SproutIcon,
  SparklesIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: 'Topics',
      items: [
        {
          title: 'Gratitude',
          description: 'Practice thankfulness and appreciation',
          icon: <HeartIcon className="size-4 shrink-0" />,
          href: '/gratitude-journal-prompts',
          external: false,
        },
        {
          title: 'Mental Health',
          description: 'Support your emotional wellbeing',
          icon: <BrainIcon className="size-4 shrink-0" />,
          href: '/journal-prompts-for-mental-health',
          external: false,
        },
        {
          title: 'Shadow Work',
          description: 'Explore your inner self',
          icon: <MoonIcon className="size-4 shrink-0" />,
          href: '/shadow-work-journal-prompts',
          external: false,
        },
        {
          title: 'Self-Discovery',
          description: 'Understand who you truly are',
          icon: <CompassIcon className="size-4 shrink-0" />,
          href: '/self-discovery-journal-prompts',
          external: false,
        },
        {
          title: 'Self-Love',
          description: 'Build a loving relationship with yourself',
          icon: <HeartHandshakeIcon className="size-4 shrink-0" />,
          href: '/self-love-journal-prompts',
          external: false,
        },
        {
          title: 'Mindfulness',
          description: 'Be present in the moment',
          icon: <LeafIcon className="size-4 shrink-0" />,
          href: '/mindfulness-journal-prompts',
          external: false,
        },
        {
          title: 'Morning',
          description: 'Start your day with intention',
          icon: <SunriseIcon className="size-4 shrink-0" />,
          href: '/morning-journal-prompts',
          external: false,
        },
        {
          title: 'Daily',
          description: 'Everyday journaling prompts',
          icon: <CalendarIcon className="size-4 shrink-0" />,
          href: '/daily-journal-prompts',
          external: false,
        },
      ],
    },
    {
      title: 'Techniques',
      items: [
        {
          title: 'All Techniques',
          description: 'Find the right journaling method for you',
          icon: <PenToolIcon className="size-4 shrink-0" />,
          href: '/techniques',
          external: false,
        },
        {
          title: 'Free Writing',
          description: 'Write without stopping or editing',
          icon: <PenToolIcon className="size-4 shrink-0" />,
          href: '/techniques/free-writing',
          external: false,
        },
        {
          title: 'For Beginners',
          description: 'Best techniques to start journaling',
          icon: <SproutIcon className="size-4 shrink-0" />,
          href: '/techniques/for-beginners',
          external: false,
        },
      ],
    },
    {
      title: 'More',
      items: [
        {
          title: 'Fun Prompts',
          description: 'Light-hearted and creative prompts',
          icon: <SmileIcon className="size-4 shrink-0" />,
          href: '/fun-journal-prompts',
          external: false,
        },
        {
          title: 'Deep Prompts',
          description: 'Thought-provoking introspection',
          icon: <LayersIcon className="size-4 shrink-0" />,
          href: '/deep-journal-prompts',
          external: false,
        },
        {
          title: 'For Kids',
          description: 'Age-appropriate prompts for children',
          icon: <BabyIcon className="size-4 shrink-0" />,
          href: '/journal-prompts-for-kids',
          external: false,
        },
        {
          title: 'For Teens',
          description: 'Prompts for teenage self-expression',
          icon: <GraduationCapIcon className="size-4 shrink-0" />,
          href: '/journal-prompts-for-teens',
          external: false,
        },
        {
          title: 'Pricing',
          description: 'Plans and pricing',
          icon: <SparklesIcon className="size-4 shrink-0" />,
          href: Routes.Pricing,
          external: false,
        },
        {
          title: 'Privacy Policy',
          description: 'How we handle your data',
          icon: <ShieldCheckIcon className="size-4 shrink-0" />,
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: 'Terms of Service',
          description: 'Our terms and conditions',
          icon: <FileTextIcon className="size-4 shrink-0" />,
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
