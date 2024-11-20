import { Suspense } from 'react';
import { SettingsForm } from '@/components/settings/settings-form';
import { SettingsSkeleton } from '@/components/settings/settings-skeleton';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences.
        </p>
      </div>
      
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsForm />
      </Suspense>
    </div>
  );
}