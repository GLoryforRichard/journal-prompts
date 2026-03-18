'use client';

import Container from '@/components/layout/container';
import { NavbarMobile } from '@/components/layout/navbar-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavbarLinks } from '@/config/navbar-config';
import { useScroll } from '@/hooks/use-scroll';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { websiteConfig } from '@/config/website';
import { Routes } from '@/routes';
import { useCurrentUser } from '@/hooks/use-current-user';
import { BookOpenIcon, LogInIcon, PenLineIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface NavBarProps {
  scroll?: boolean;
}

export function Navbar({ scroll = true }: NavBarProps) {
  const t = useTranslations();
  const scrolled = useScroll(50);
  const menuLinks = useNavbarLinks();
  const localePathname = useLocalePathname();
  const user = useCurrentUser();
  const [menuValue, setMenuValue] = useState<string | undefined>(undefined);
  const showBarBg = scroll && scrolled;

  // Close menu on route change
  useEffect(() => {
    setMenuValue(undefined);
  }, [localePathname]);

  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-40 py-3 transition-all duration-300',
        showBarBg && 'border-b-2 border-[#2d2d2d]'
      )}
      style={{
        backgroundColor: showBarBg ? 'rgba(253, 251, 247, 0.95)' : 'transparent',
        backdropFilter: showBarBg ? 'blur(8px)' : 'none',
      }}
    >
      <Container className="px-4">
        {/* desktop navbar */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4"
        >
          <LocaleLink
            href="/"
            aria-label="Home"
            className="flex items-center gap-2 shrink-0 no-underline"
          >
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
              style={{
                fontFamily: 'var(--font-hand-title)',
                color: '#2d2d2d',
              }}
            >
              {t('Metadata.name')}
            </span>
          </LocaleLink>

          <NavigationMenu
            value={menuValue}
            onValueChange={setMenuValue}
            className="flex-1 justify-center"
          >
            <NavigationMenuList>
              {menuLinks?.map((item) =>
                item.items ? (
                  <NavigationMenuItem key={item.title} value={item.title}>
                    <NavigationMenuTrigger
                      className="bg-transparent text-base"
                      style={{
                        fontFamily: 'var(--font-hand-body)',
                        color: '#2d2d2d',
                        fontSize: '1.05rem',
                      }}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className="grid w-100 gap-2 p-3 md:w-125 md:grid-cols-2 lg:w-150"
                        style={{ backgroundColor: '#fdfbf7', border: '2px solid #2d2d2d', borderRadius: '12px', boxShadow: '4px 4px 0px 0px #2d2d2d' }}
                      >
                        {item.items.map((sub) => (
                          <li key={sub.title}>
                            <NavigationMenuLink asChild>
                              <LocaleLink
                                href={sub.href ?? '#'}
                                onClick={() => setMenuValue(undefined)}
                                className="group flex select-none flex-row items-center gap-3 rounded-lg p-2.5 no-underline transition-all duration-150 hover:bg-[#fff9c4]"
                                style={{ color: '#2d2d2d' }}
                              >
                                {sub.icon ? (
                                  <div
                                    className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                                    style={{ backgroundColor: '#fff9c4', border: '1.5px solid #2d2d2d' }}
                                  >
                                    {sub.icon}
                                  </div>
                                ) : null}
                                <div className="flex-1 min-w-0">
                                  <div
                                    className="font-bold text-sm"
                                    style={{ fontFamily: 'var(--font-hand-title)' }}
                                  >
                                    {sub.title}
                                  </div>
                                  {sub.description ? (
                                    <p
                                      className="text-xs mt-0.5 opacity-60"
                                      style={{ fontFamily: 'var(--font-hand-body)' }}
                                    >
                                      {sub.description}
                                    </p>
                                  ) : null}
                                </div>
                              </LocaleLink>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <LocaleLink
                        href={item.href || '#'}
                        className="px-3 py-2 text-base no-underline transition-colors hover:text-[#ff4d4d]"
                        style={{
                          fontFamily: 'var(--font-hand-body)',
                          color: '#2d2d2d',
                          fontSize: '1.05rem',
                        }}
                      >
                        {item.title}
                      </LocaleLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="shrink-0 flex items-center gap-3">
            {user ? (
              <LocaleLink
                href={Routes.Dashboard}
                className="inline-flex items-center gap-2 px-4 py-2 no-underline transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  fontSize: '1rem',
                  color: '#2d2d2d',
                  border: '2px solid #2d2d2d',
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  boxShadow: '2px 2px 0px 0px #2d2d2d',
                  backgroundColor: '#fff9c4',
                }}
              >
                <BookOpenIcon size={16} strokeWidth={2.5} />
                My Journal
              </LocaleLink>
            ) : (
              (websiteConfig.auth.enableGoogleLogin || websiteConfig.auth.enableGithubLogin || websiteConfig.auth.enableCredentialLogin) && (
                <LocaleLink
                  href={Routes.Login}
                  className="inline-flex items-center gap-2 px-4 py-2 no-underline transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    fontSize: '1rem',
                    color: '#2d2d2d',
                    border: '2px solid #2d2d2d',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    boxShadow: '2px 2px 0px 0px #2d2d2d',
                    backgroundColor: '#fff9c4',
                  }}
                >
                  <LogInIcon size={16} strokeWidth={2.5} />
                  Sign In
                </LocaleLink>
              )
            )}
            <LocaleLink
              href="/find-your-prompt"
              className="inline-flex items-center gap-2 px-5 py-2 text-white no-underline transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-hand-title)',
                fontSize: '1rem',
                backgroundColor: '#ff4d4d',
                border: '2px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '3px 3px 0px 0px #2d2d2d',
              }}
            >
              <PenLineIcon size={16} strokeWidth={2.5} />
              Get Your Prompt
            </LocaleLink>
          </div>
        </nav>

        {/* mobile navbar */}
        <NavbarMobile className="lg:hidden" />
      </Container>
    </header>
  );
}
