'use client';

import { createContext, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTenantTheme, type TenantTheme } from '@/lib/api/theme';
import { generateCssVariables } from '@/lib/utils';
import { useTenant } from '@/lib/hooks/useTenant';

const TenantThemeContext = createContext<TenantTheme | null>(null);

export function useTenantTheme() {
  const theme = useContext(TenantThemeContext);
  if (!theme) throw new Error('useTenantTheme must be used within TenantThemeProvider');
  return theme;
}

export function TenantThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = useTenant();
  const { data: theme } = useQuery({
    queryKey: ['theme', tenant.id],
    queryFn: () => getTenantTheme(tenant.id),
  });

  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      root.style.cssText = generateCssVariables(theme);
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <TenantThemeContext.Provider value={theme}>
      {children}
    </TenantThemeContext.Provider>
  );
}