'use client';

import { useParams } from 'next/navigation';
import { ROLE_PERMISSIONS, type Permission, type Role, type User } from '../types/tenant';

// Simulated authenticated user - In production, this would come from your auth provider
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  tenantId: 'acme',
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
};

export function useAuth() {
  const params = useParams();
  const tenantId = params?.tenant as string;

  const hasPermission = (permission: Permission) => {
    const userRole = MOCK_USER.role;
    const rolePermissions = ROLE_PERMISSIONS[userRole];
    
    return rolePermissions.some(
      (p) =>
        (p.resource === '*' || p.resource === permission.resource) &&
        (p.action === permission.action || p.action === '*')
    );
  };

  return {
    user: MOCK_USER,
    isAuthenticated: true,
    hasPermission,
    role: MOCK_USER.role as Role,
  };
}