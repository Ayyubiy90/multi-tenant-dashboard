'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getTenantSettings, updateTenantSettings } from '@/lib/api/settings';
import { useTenant } from '@/lib/hooks/useTenant';
import { Bell, Shield } from 'lucide-react';
import { ThemeSettings } from '@/components/settings/theme-settings';

const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    slack: z.boolean(),
  }),
  security: z.object({
    twoFactorAuth: z.boolean(),
    passwordRotation: z.number().min(1).max(365),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export function SettingsForm() {
  const tenant = useTenant();
  const { data: settings } = useQuery({
    queryKey: ['settings', tenant.id],
    queryFn: () => getTenantSettings(tenant.id),
  });

  const { mutate } = useMutation({
    mutationFn: (data: Partial<SettingsFormData>) =>
      updateTenantSettings(tenant.id, data),
  });

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const onSubmit = (data: SettingsFormData) => {
    mutate(data);
  };

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <ThemeSettings />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Bell className="h-5 w-5" />
            <h3 className="text-lg font-medium">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <Label htmlFor="email-notifications" className="flex-grow">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={form.watch('notifications.email')}
                onCheckedChange={(checked) =>
                  form.setValue('notifications.email', checked)
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="slack-notifications">Slack Notifications</Label>
              <Switch
                id="slack-notifications"
                checked={form.watch('notifications.slack')}
                onCheckedChange={(checked) =>
                  form.setValue('notifications.slack', checked)
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="h-5 w-5" />
            <h3 className="text-lg font-medium">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch
                id="two-factor"
                checked={form.watch('security.twoFactorAuth')}
                onCheckedChange={(checked) =>
                  form.setValue('security.twoFactorAuth', checked)
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password-rotation">Password Rotation (days)</Label>
              <Input
                id="password-rotation"
                type="number"
                {...form.register('security.passwordRotation', {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
        </Card>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}