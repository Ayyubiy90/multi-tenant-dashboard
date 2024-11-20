import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-6 w-10" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-6 w-10" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-[200px]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[220px]" />
              <Skeleton className="h-6 w-10" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}