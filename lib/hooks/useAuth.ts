'use client';

import { useParams } from 'next/navigation';
import { ROLE_PERMISSIONS, type Permission, type Role, type User } from '../types/tenant';
import { useEffect, useState } from 'react';

// Default unauthenticated state
const ANONYMOUS_USER: User = {
  id: '',
  name: '',
  email: '',
  role: 'user',
  tenantId: '',
  avatar: '',
};

// Initial authenticated user state
const INITIAL_USER: User = {
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
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check authentication status on mount and when cookies change
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', { method: 'GET' });
        if (!response.ok) {
          setUser(ANONYMOUS_USER);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(ANONYMOUS_USER);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const hasPermission = (permission: Permission) => {
    const userRole = user.role;
    const rolePermissions = ROLE_PERMISSIONS[userRole];
    
    return rolePermissions.some(
      (p) =>
        (p.resource === '*' || p.resource === permission.resource) &&
        (p.action === permission.action || p.action === '*')
    );
  };

  return {
    user,
    isAuthenticated,
    hasPermission,
    role: user.role as Role,
  };
}