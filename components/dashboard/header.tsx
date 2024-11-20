'use client';

import { useTenant } from '@/lib/hooks/useTenant';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

export function DashboardHeader() {
  const tenant = useTenant();
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening at {tenant.name} today
        </p>
      </div>
      <Card className="p-4 flex items-center gap-4">
        <CalendarDays className="h-6 w-6 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Card>
    </div>
  );
}