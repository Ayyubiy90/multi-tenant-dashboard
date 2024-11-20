'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUsers, updateUserRole } from '@/lib/api/users';
import { useTenant } from '@/lib/hooks/useTenant';
import { type Role } from '@/lib/types/tenant';

export function UsersList() {
  const tenant = useTenant();
  const queryClient = useQueryClient();
  
  const { data: users } = useQuery({
    queryKey: ['users', tenant.id],
    queryFn: () => getUsers(tenant.id),
  });

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
      updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', tenant.id] });
    },
  });

  if (!users) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {user.name}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                value={user.role}
                onValueChange={(role: Role) =>
                  updateRole({ userId: user.id, role })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}