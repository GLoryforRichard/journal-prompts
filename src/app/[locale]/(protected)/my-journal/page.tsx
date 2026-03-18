import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { MyJournal } from '@/components/journal/my-journal';

export default function DashboardPage() {
  const breadcrumbs = [
    {
      label: 'My Journal',
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2">
          <MyJournal />
        </div>
      </div>
    </>
  );
}
