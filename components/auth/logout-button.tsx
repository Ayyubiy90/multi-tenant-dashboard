'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      title="Sign out"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}