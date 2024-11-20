import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  // If authenticated, redirect to user's tenant dashboard
  redirect(`/${session.tenantId}/dashboard`);
}