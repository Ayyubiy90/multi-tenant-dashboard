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
  action: 'read' | 'write' | 'delete' | '*';
  resource: string;
}

export interface WidgetPermission {
  canView: boolean;
  canCustomize: boolean;
  canExport: boolean;
  canRefresh: boolean;
  refreshInterval?: number;
}

export const WIDGET_PERMISSIONS: Record<Role, WidgetPermission> = {
  admin: {
    canView: true,
    canCustomize: true,
    canExport: true,
    canRefresh: true,
    refreshInterval: 1000,
  },
  manager: {
    canView: true,
    canCustomize: true,
    canExport: false,
    canRefresh: true,
    refreshInterval: 5000,
  },
  viewer: {
    canView: true,
    canCustomize: false,
    canExport: false,
    canRefresh: false,
    refreshInterval: 10000,
  },
};

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