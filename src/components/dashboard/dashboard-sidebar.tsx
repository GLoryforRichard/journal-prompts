'use client';

import { SidebarMain } from '@/components/dashboard/sidebar-main';
import { SidebarUser } from '@/components/dashboard/sidebar-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useSidebarLinks } from '@/config/sidebar-config';
import { LocaleLink } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { Routes } from '@/routes';
import { PenLineIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { UpgradeCard } from './upgrade-card';

/**
 * Dashboard sidebar — hand-drawn journal style
 */
export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;
  const { state } = useSidebar();

  const sidebarLinks = useSidebarLinks();
  const filteredSidebarLinks = sidebarLinks.filter((link) => {
    if (link.authorizeOnly) {
      return link.authorizeOnly.includes(currentUser?.role || '');
    }
    return true;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="!bg-[#fdfbf7] !border-r-0"
      style={{
        borderRight: '2px dashed #e5e0d8',
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:!bg-[#fff9c4]"
            >
              <LocaleLink href={Routes.Root} className="!no-underline">
                <div
                  className="flex items-center justify-center w-7 h-7 shrink-0"
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
                  className="truncate text-base"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    fontWeight: 700,
                    color: '#2d2d2d',
                  }}
                >
                  {t('Metadata.name')}
                </span>
              </LocaleLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {!isPending && mounted && <SidebarMain items={filteredSidebarLinks} />}
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-4">
        {!isPending && mounted && (
          <>
            {currentUser && state !== 'collapsed' && <UpgradeCard />}
            {currentUser && <SidebarUser user={currentUser} />}
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
