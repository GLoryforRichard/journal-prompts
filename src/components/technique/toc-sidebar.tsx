'use client';

import { useEffect, useState } from 'react';

const TOC_ITEMS = [
  { id: 'technique-quiz', label: 'Quiz' },
  { id: 'compare', label: 'Compare' },
  { id: 'popular-techniques', label: 'Techniques' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'by-situation', label: 'By Situation' },
  { id: 'how-to-start', label: 'How to Start' },
  { id: 'science', label: 'Science' },
  { id: 'what-are', label: 'What Are' },
  { id: 'types', label: 'Types' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'faqs', label: 'FAQ' },
];

export function TocSidebar() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    for (const item of TOC_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
      aria-label="Table of contents"
    >
      <ul className="space-y-2 list-none p-0 m-0">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-xs no-underline transition-all duration-200 px-3 py-1 rounded"
              style={{
                fontFamily: 'var(--font-hand-body)',
                color: activeId === item.id ? '#ff4d4d' : '#2d2d2d',
                opacity: activeId === item.id ? 1 : 0.4,
                fontWeight: activeId === item.id ? 700 : 400,
                backgroundColor: activeId === item.id ? '#fff0f0' : 'transparent',
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
