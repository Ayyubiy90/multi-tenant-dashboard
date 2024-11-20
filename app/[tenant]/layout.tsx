import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { TenantNav } from '@/components/tenant-nav';
import { Providers } from '@/app/providers';
import { TenantThemeProvider } from '@/components/theme/tenant-theme-provider';

const inter = Inter({ subsets: ['latin'] });

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const headersList = headers();
  const tenantId = headersList.get('x-tenant-id');

  if (!tenantId) {
    return null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <TenantThemeProvider>
            <div className="min-h-screen bg-background">
              <TenantNav tenant={params.tenant} />
              <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">{children}</main>
            </div>
          </TenantThemeProvider>
        </Providers>
      </body>
    </html>
  );
}