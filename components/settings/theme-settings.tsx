'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Paintbrush } from 'lucide-react';
import { getTenantTheme, updateTenantTheme } from '@/lib/api/theme';
import { useTenant } from '@/lib/hooks/useTenant';

const themeSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});

type ThemeFormData = z.infer<typeof themeSchema>;

export function ThemeSettings() {
  const tenant = useTenant();
  const queryClient = useQueryClient();
  
  const { data: theme } = useQuery({
    queryKey: ['theme', tenant.id],
    queryFn: () => getTenantTheme(tenant.id),
  });

  const { mutate } = useMutation({
    mutationFn: (data: Partial<ThemeFormData>) =>
      updateTenantTheme(tenant.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theme', tenant.id] });
    },
  });

  const form = useForm<ThemeFormData>({
    resolver: zodResolver(themeSchema),
    defaultValues: theme,
  });

  const onSubmit = (data: ThemeFormData) => {
    mutate(data);
  };

  if (!theme) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Paintbrush className="h-5 w-5" />
        <h3 className="text-lg font-medium">Theme Customization</h3>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primary">Primary Color (HSL)</Label>
          <Input
            id="primary"
            {...form.register('primary')}
            placeholder="221 83% 53%"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondary">Secondary Color (HSL)</Label>
          <Input
            id="secondary"
            {...form.register('secondary')}
            placeholder="262 83% 58%"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accent">Accent Color (HSL)</Label>
          <Input
            id="accent"
            {...form.register('accent')}
            placeholder="221 83% 53%"
          />
        </div>

        <div className="pt-4">
          <Button type="submit">Update Theme</Button>
        </div>
      </form>
    </Card>
  );
}