import { User } from '@/lib/types/tenant';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    tenantId: 'acme',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'manager',
    tenantId: 'acme',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'viewer',
    tenantId: 'acme',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
  },
];

export async function getUsers(tenantId: string): Promise<User[]> {
  await delay(1000); // Simulate network delay
  return mockUsers.filter(user => user.tenantId === tenantId);
}

export async function updateUserRole(userId: string, role: User['role']): Promise<User> {
  await delay(500);
  const user = mockUsers.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  
  user.role = role;
  return user;
}