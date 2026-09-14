import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { MyJournal } from '@/components/journal/my-journal';
import { Navbar } from '@/components/layout/navbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/lib/server';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: 'My Journal',
  robots: { index: false, follow: false },
};

export default async function MyJournalPage() {
  const session = await getSession();
  if (!session?.user) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fdfbf7' }}>
        <Navbar />
        <main className="mx-auto max-w-4xl pt-6 pb-16">
          <MyJournal />
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 64)',
          '--header-height': 'calc(var(--spacing) * 12)',
          backgroundColor: '#fdfbf7',
        } as CSSProperties
      }
    >
      <DashboardSidebar variant="inset" />
      <SidebarInset style={{ backgroundColor: '#fdfbf7' }}>
        <DashboardHeader
          breadcrumbs={[{ label: 'My Journal', isCurrentPage: true }]}
        />
        <MyJournal />
      </SidebarInset>
    </SidebarProvider>
  );
}
