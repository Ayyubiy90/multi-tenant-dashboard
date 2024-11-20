'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button';
import {
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Users', href: '/users', icon: Users },
];

export function TenantNav({ tenant }: { tenant: string }) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="mr-8">
          <Link href={`/${tenant}/dashboard`} className="text-xl font-bold">
            {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
          </Link>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          {navigation.map((item) => {
            const href = `/${tenant}${item.href}`;
            const isActive = pathname === href;
            
            return (
              <Link
                key={item.name}
                href={href}
                className={cn(
                  'flex items-center text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {user.name}
          </span>
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
}