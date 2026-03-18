'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useLocaleRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import type { User } from 'better-auth';
import {
  ChevronsUpDown,
  LogOut,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { UserAvatar } from '../layout/user-avatar';

interface SidebarUserProps {
  user: User;
  className?: string;
}

/**
 * User navigation — hand-drawn journal style
 */
export function SidebarUser({ user, className }: SidebarUserProps) {
  const router = useLocaleRouter();
  const { isMobile } = useSidebar();
  const t = useTranslations();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/');
        },
        onError: (error) => {
          console.error('sign out error:', error);
          toast.error(t('Common.logoutFailed'));
        },
      },
    });
  };

  return (
    <SidebarMenu
      className="pt-4"
      style={{ borderTop: '2px dashed #e5e0d8' }}
    >
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:!bg-[#fff9c4] data-[state=open]:!bg-[#fff9c4]"
            >
              <UserAvatar
                name={user.name}
                image={user.image}
                className="size-8"
                style={{
                  border: '2px solid #2d2d2d',
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                }}
              />

              <div className="grid flex-1 text-left leading-tight">
                <span
                  className="truncate"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#2d2d2d',
                  }}
                >
                  {user.name}
                </span>
                <span
                  className="truncate"
                  style={{
                    fontFamily: 'var(--font-hand-body)',
                    fontSize: '0.7rem',
                    color: '#2d2d2d',
                    opacity: 0.6,
                  }}
                >
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" style={{ color: '#2d2d2d', opacity: 0.4 }} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
            style={{
              backgroundColor: '#fdfbf7',
              border: '2px solid #2d2d2d',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px 0px #2d2d2d',
            }}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2 text-left">
                <UserAvatar
                  name={user.name}
                  image={user.image}
                  className="size-8"
                  style={{
                    border: '2px solid #2d2d2d',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  }}
                />
                <div className="grid flex-1 text-left leading-tight">
                  <span
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-hand-title)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#2d2d2d',
                    }}
                  >
                    {user.name}
                  </span>
                  <span
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      fontSize: '0.7rem',
                      color: '#2d2d2d',
                      opacity: 0.6,
                    }}
                  >
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator style={{ backgroundColor: '#e5e0d8' }} />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async (event) => {
                event.preventDefault();
                handleSignOut();
              }}
              style={{
                fontFamily: 'var(--font-hand-body)',
                fontSize: '0.9rem',
                color: '#2d2d2d',
              }}
            >
              <LogOut className="mr-2 size-4" />
              {t('Common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
