'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useNavbarLinks } from '@/config/navbar-config';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { websiteConfig } from '@/config/website';
import { Routes } from '@/routes';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  BookOpenIcon,
  ChevronRightIcon,
  LogInIcon,
  MenuIcon,
  PenLineIcon,
  XIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface NavbarMobileProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NavbarMobile({ className, ...props }: NavbarMobileProps) {
  const t = useTranslations();
  const localePathname = useLocalePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuLinks = useNavbarLinks();
  const user = useCurrentUser();

  useEffect(() => {
    setMounted(true);
    setOpen(false);
  }, [localePathname]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={cn('flex items-center justify-between', className)}
        {...props}
      >
        <LocaleLink href="/" className="flex items-center gap-2 no-underline">
          <div
            className="flex items-center justify-center w-8 h-8"
            style={{
              backgroundColor: '#ff4d4d',
              border: '2px solid #2d2d2d',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: '2px 2px 0px 0px #2d2d2d',
              transform: 'rotate(-3deg)',
            }}
          >
            <PenLineIcon size={14} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            {t('Metadata.name')}
          </span>
        </LocaleLink>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="w-9 h-9 flex items-center justify-center cursor-pointer"
          style={{
            border: '2px solid #2d2d2d',
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            backgroundColor: open ? '#ff4d4d' : '#fff9c4',
            color: open ? '#fff' : '#2d2d2d',
            boxShadow: '2px 2px 0px 0px #2d2d2d',
          }}
        >
          {open ? <XIcon size={18} strokeWidth={2.5} /> : <MenuIcon size={18} strokeWidth={2.5} />}
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 top-[60px] z-50 flex flex-col overflow-y-auto"
          style={{ backgroundColor: '#fdfbf7' }}
        >
          <div className="flex flex-1 flex-col p-4 gap-2">
            {menuLinks?.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <Collapsible>
                    <CollapsibleTrigger
                      className="w-full flex items-center justify-between py-3 px-3 text-left cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-hand-title)',
                        fontSize: '1.15rem',
                        color: '#2d2d2d',
                        borderBottom: '2px dashed #e5e0d8',
                      }}
                    >
                      {item.title}
                      <ChevronRightIcon size={18} strokeWidth={2.5} style={{ color: '#2d5da1' }} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-2 pt-1 pb-2">
                      <ul className="space-y-1">
                        {item.items.map((sub) => (
                          <li key={sub.title}>
                            <LocaleLink
                              href={sub.href ?? '#'}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 py-2 px-3 rounded-lg no-underline transition-colors hover:bg-[#fff9c4]"
                              style={{
                                fontFamily: 'var(--font-hand-body)',
                                fontSize: '1rem',
                                color: '#2d2d2d',
                              }}
                            >
                              {sub.icon ? (
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                  {sub.icon}
                                </div>
                              ) : null}
                              {sub.title}
                            </LocaleLink>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <LocaleLink
                    href={item.href ?? '#'}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-3 no-underline"
                    style={{
                      fontFamily: 'var(--font-hand-title)',
                      fontSize: '1.15rem',
                      color: '#2d2d2d',
                      borderBottom: '2px dashed #e5e0d8',
                    }}
                  >
                    {item.title}
                  </LocaleLink>
                )}
              </div>
            ))}

            {/* CTA */}
            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <LocaleLink
                  href={Routes.Dashboard}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 no-underline"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    fontSize: '1.1rem',
                    color: '#2d2d2d',
                    backgroundColor: '#fff9c4',
                    border: '2px solid #2d2d2d',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    boxShadow: '4px 4px 0px 0px #2d2d2d',
                  }}
                >
                  <BookOpenIcon size={18} strokeWidth={2.5} />
                  My Journal
                </LocaleLink>
              ) : (
                (websiteConfig.auth.enableGoogleLogin || websiteConfig.auth.enableGithubLogin || websiteConfig.auth.enableCredentialLogin) && (
                  <LocaleLink
                    href={Routes.Login}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 no-underline"
                    style={{
                      fontFamily: 'var(--font-hand-title)',
                      fontSize: '1.1rem',
                      color: '#2d2d2d',
                      backgroundColor: '#fff9c4',
                      border: '2px solid #2d2d2d',
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      boxShadow: '4px 4px 0px 0px #2d2d2d',
                    }}
                  >
                    <LogInIcon size={18} strokeWidth={2.5} />
                    Sign In
                  </LocaleLink>
                )
              )}
              <LocaleLink
                href="/find-your-prompt"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-white no-underline"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  fontSize: '1.1rem',
                  backgroundColor: '#ff4d4d',
                  border: '2px solid #2d2d2d',
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  boxShadow: '4px 4px 0px 0px #2d2d2d',
                }}
              >
                <PenLineIcon size={18} strokeWidth={2.5} />
                Get Your Prompt
              </LocaleLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
