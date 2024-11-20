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
  Menu,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href={`/${tenant}/dashboard`} className="text-xl font-bold mr-8">
            {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
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
        
        {/* Desktop User Info and Logout */}
        <div className="hidden md:flex ml-auto items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {user.name}
          </span>
          <LogoutButton />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 py-4">
                <div className="px-3 py-2">
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                {navigation.map((item) => {
                  const href = `/${tenant}${item.href}`;
                  const isActive = pathname === href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={href}
                      className={cn(
                        'flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
                <div className="px-3 py-2">
                  <LogoutButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}