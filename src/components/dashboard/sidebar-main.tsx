'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import type { NestedMenuItem } from '@/types';

/**
 * Main navigation for the sidebar — hand-drawn journal style
 */
export function SidebarMain({ items }: { items: NestedMenuItem[] }) {
  const pathname = useLocalePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  const isActive = (href: string | undefined): boolean => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {items.map((item) =>
        item.items && item.items.length > 0 ? (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel
              style={{
                fontFamily: 'var(--font-hand-body)',
                fontSize: '0.75rem',
                color: '#2d2d2d',
                opacity: 0.5,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-1">
              <SidebarMenu className="gap-1">
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(subItem.href)}
                      className="hover:!bg-[#fff9c4] data-[active=true]:!bg-[#fff9c4] data-[active=true]:!border-l-2 data-[active=true]:!border-[#ff4d4d]"
                    >
                      <LocaleLink
                        href={subItem.href || ''}
                        onClick={closeMobileSidebar}
                        className="!no-underline"
                      >
                        {subItem.icon ? subItem.icon : null}
                        <span
                          className="truncate"
                          style={{
                            fontFamily: 'var(--font-hand-body)',
                            fontSize: '0.95rem',
                            color: '#2d2d2d',
                          }}
                        >
                          {subItem.title}
                        </span>
                      </LocaleLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent className="flex flex-col gap-1">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className="hover:!bg-[#fff9c4] data-[active=true]:!bg-[#fff9c4] data-[active=true]:!border-l-2 data-[active=true]:!border-[#ff4d4d]"
                  >
                    <LocaleLink
                      href={item.href || ''}
                      onClick={closeMobileSidebar}
                      className="!no-underline"
                    >
                      {item.icon ? item.icon : null}
                      <span
                        className="truncate"
                        style={{
                          fontFamily: 'var(--font-hand-body)',
                          fontSize: '0.95rem',
                          color: '#2d2d2d',
                        }}
                      >
                        {item.title}
                      </span>
                    </LocaleLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )
      )}
    </>
  );
}
