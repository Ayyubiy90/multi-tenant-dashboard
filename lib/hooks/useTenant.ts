'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export function useTenant() {
  const params = useParams();
  const tenantId = params?.tenant as string;

  const tenant = useMemo(() => ({
    id: tenantId,
    name: tenantId.charAt(0).toUpperCase() + tenantId.slice(1),
    // In a real app, this would fetch from an API
    plan: 'pro' as const,
  }), [tenantId]);

  return tenant;
}