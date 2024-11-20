export interface Tenant {
  id: string;
  name: string;
  plan: 'starter' | 'pro' | 'enterprise';
  theme?: {
    primary: string;
    secondary: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  tenantId: string;
  avatar?: string;
}

export type Role = 'admin' | 'manager' | 'viewer';

export interface Permission {
  action: 'read' | 'write' | 'delete';
  resource: string;
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { action: 'read', resource: '*' },
    { action: 'write', resource: '*' },
    { action: 'delete', resource: '*' },
  ],
  manager: [
    { action: 'read', resource: '*' },
    { action: 'write', resource: 'dashboard' },
    { action: 'write', resource: 'team' },
  ],
  viewer: [
    { action: 'read', resource: 'dashboard' },
  ],
};