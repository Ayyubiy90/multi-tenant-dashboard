import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardWidgets } from '@/components/dashboard/widgets';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardWidgets />
    </div>
  );
}