import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { type User } from './types/tenant';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function createToken(user: User): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as User;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export async function getSession() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;
  
  try {
    return await verifyToken(token);
  } catch (err) {
    return null;
  }
}

// Mock authentication function - In production, this would verify against a database
export async function authenticate(email: string, password: string): Promise<User | null> {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock user credentials
  const mockUsers: Record<string, { password: string; user: User }> = {
    'admin@acme.com': {
      password: 'admin123',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'admin@acme.com',
        role: 'admin',
        tenantId: 'acme',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      },
    },
    'manager@startup.com': {
      password: 'manager123',
      user: {
        id: '2',
        name: 'Jane Smith',
        email: 'manager@startup.com',
        role: 'manager',
        tenantId: 'startup',
        avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
      },
    },
  };

  const userRecord = mockUsers[email];
  if (userRecord && userRecord.password === password) {
    return userRecord.user;
  }

  return null;
}