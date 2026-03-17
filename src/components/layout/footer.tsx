'use client';

import Container from '@/components/layout/container';
import { useFooterLinks } from '@/config/footer-config';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { PenLineIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const footerLinks = useFooterLinks();
  const localePathname = useLocalePathname();

  return (
    <footer
      className={cn('relative', className)}
      style={{
        borderTop: '3px solid #2d2d2d',
        backgroundColor: '#fdfbf7',
      }}
    >
      {/* Decorative tape strips */}
      <div
        className="absolute -top-4 left-[10%] h-7 w-20 opacity-60 hidden md:block"
        style={{
          backgroundColor: '#fff9c4',
          border: '1px solid #e5e0d8',
          transform: 'rotate(-5deg)',
        }}
      />
      <div
        className="absolute -top-4 right-[15%] h-7 w-16 opacity-60 hidden md:block"
        style={{
          backgroundColor: '#fff9c4',
          border: '1px solid #e5e0d8',
          transform: 'rotate(3deg)',
        }}
      />

      <Container className="px-4">
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-6">
          {/* Brand section */}
          <div className="flex flex-col items-start col-span-full md:col-span-2">
            <div className="space-y-4">
              {/* Logo */}
              <LocaleLink href="/" className="flex items-center gap-2 no-underline">
                <div
                  className="flex items-center justify-center w-9 h-9"
                  style={{
                    backgroundColor: '#ff4d4d',
                    border: '2px solid #2d2d2d',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    boxShadow: '2px 2px 0px 0px #2d2d2d',
                    transform: 'rotate(-3deg)',
                  }}
                >
                  <PenLineIcon size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
                >
                  {t('Metadata.name')}
                </span>
              </LocaleLink>

              {/* Tagline */}
              <p
                className="text-base py-1 md:pr-8"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                  opacity: 0.7,
                  fontSize: '1.05rem',
                }}
              >
                {t('Marketing.footer.tagline')}
              </p>

              {/* Psychology citation */}
              <p
                className="text-xs italic"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                  opacity: 0.5,
                }}
              >
                Prompts inspired by research in positive psychology, CBT, and mindfulness practices.
              </p>
            </div>
          </div>

          {/* Footer link sections */}
          {footerLinks?.map((section) => (
            <div
              key={section.title}
              className="col-span-1 md:col-span-1 items-start"
            >
              <span
                className="text-sm font-bold uppercase tracking-wide"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#2d2d2d',
                  fontSize: '0.85rem',
                }}
              >
                {section.title}
              </span>
              <ul className="mt-3 list-inside space-y-2">
                {section.items?.map(
                  (item) =>
                    item.href && (
                      <li key={item.title}>
                        <LocaleLink
                          href={item.href || '#'}
                          target={item.external ? '_blank' : undefined}
                          className={cn(
                            'no-underline transition-colors duration-150',
                            !item.external &&
                              !item.href.includes('#') &&
                              (item.href === '/'
                                ? localePathname === '/'
                                : localePathname.startsWith(item.href))
                              ? 'font-bold'
                              : ''
                          )}
                          style={{
                            fontFamily: 'var(--font-hand-body)',
                            color: '#2d5da1',
                            fontSize: '1rem',
                          }}
                        >
                          {item.title}
                        </LocaleLink>
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '2px dashed #e5e0d8',
          padding: '1.25rem 0',
        }}
      >
        <Container className="px-4 flex items-center justify-between gap-x-4">
          <span
            className="text-sm"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.5,
            }}
          >
            &copy; {new Date().getFullYear()} {t('Metadata.name')}. All Rights Reserved.
          </span>
          <span
            className="text-sm"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.4,
            }}
          >
            Made with ♥ for journaling
          </span>
        </Container>
      </div>
    </footer>
  );
}
