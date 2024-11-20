import { delay } from '@/lib/utils';

export interface TenantTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const mockThemes: Record<string, TenantTheme> = {
  acme: {
    primary: '221 83% 53%',    // Blue
    secondary: '262 83% 58%',  // Purple
    accent: '221 83% 53%',     // Blue
    background: '0 0% 100%',   // White
  },
  startup: {
    primary: '142 76% 36%',    // Green
    secondary: '176 73% 29%',  // Teal
    accent: '142 76% 36%',     // Green
    background: '0 0% 100%',   // White
  },
  enterprise: {
    primary: '346 77% 49.8%',  // Red
    secondary: '24 75% 50%',   // Orange
    accent: '346 77% 49.8%',   // Red
    background: '0 0% 100%',   // White
  },
};

export async function getTenantTheme(tenantId: string): Promise<TenantTheme> {
  await delay(500);
  const theme = mockThemes[tenantId];
  if (!theme) throw new Error('Theme not found');
  return theme;
}

export async function updateTenantTheme(
  tenantId: string,
  updates: Partial<TenantTheme>
): Promise<TenantTheme> {
  await delay(500);
  const theme = mockThemes[tenantId];
  if (!theme) throw new Error('Theme not found');
  
  Object.assign(theme, updates);
  return theme;
}