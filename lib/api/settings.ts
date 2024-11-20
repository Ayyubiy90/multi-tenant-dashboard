import { Tenant } from '@/lib/types/tenant';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface TenantSettings extends Tenant {
  notifications: {
    email: boolean;
    slack: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    passwordRotation: number; // days
  };
}

const mockSettings: Record<string, TenantSettings> = {
  acme: {
    id: 'acme',
    name: 'Acme Corp',
    plan: 'enterprise',
    notifications: {
      email: true,
      slack: true,
    },
    security: {
      twoFactorAuth: true,
      passwordRotation: 90,
    },
  },
  startup: {
    id: 'startup',
    name: 'Startup Inc',
    plan: 'pro',
    notifications: {
      email: true,
      slack: false,
    },
    security: {
      twoFactorAuth: false,
      passwordRotation: 30,
    },
  },
};

export async function getTenantSettings(tenantId: string): Promise<TenantSettings> {
  await delay(800);
  const settings = mockSettings[tenantId];
  if (!settings) throw new Error('Tenant not found');
  return settings;
}

export async function updateTenantSettings(
  tenantId: string,
  updates: Partial<TenantSettings>
): Promise<TenantSettings> {
  await delay(500);
  const settings = mockSettings[tenantId];
  if (!settings) throw new Error('Tenant not found');
  
  Object.assign(settings, updates);
  return settings;
}