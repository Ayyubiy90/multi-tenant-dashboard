import { Suspense } from 'react';
import { UsersList } from '@/components/users/users-list';
import { UsersTableSkeleton } from '@/components/users/users-skeleton';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
        <p className="text-muted-foreground">
          Manage your team members and their roles.
        </p>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersList />
      </Suspense>
    </div>
  );
}