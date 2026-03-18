import { SidebarTrigger } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';

interface DashboardBreadcrumbItem {
  label: string;
  isCurrentPage?: boolean;
}

interface DashboardHeaderProps {
  breadcrumbs: DashboardBreadcrumbItem[];
  actions?: ReactNode;
}

/**
 * Dashboard header — hand-drawn journal style
 */
export function DashboardHeader({
  breadcrumbs,
  actions,
}: DashboardHeaderProps) {
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
      style={{ borderBottom: '2px dashed #e5e0d8' }}
    >
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" style={{ color: '#2d2d2d' }} />
        <div
          className="mx-2 h-4"
          style={{ borderLeft: '2px dashed #e5e0d8' }}
        />

        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-2">
            {breadcrumbs.map((item, index) => (
              <li key={`breadcrumb-${index}`} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    className="hidden md:block"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                      opacity: 0.3,
                    }}
                  >
                    /
                  </span>
                )}
                <span
                  className={index < breadcrumbs.length - 1 ? 'hidden md:block' : ''}
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    fontSize: '1.1rem',
                    fontWeight: item.isCurrentPage ? 700 : 400,
                    color: '#2d2d2d',
                  }}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {actions && (
          <div className="ml-auto flex items-center gap-3 pl-4">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
