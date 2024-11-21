import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, verifyRoutePermission } from './lib/auth';

// Simulated tenant validation - In production, this would check against a database
const VALID_TENANTS = ['acme', 'startup', 'enterprise'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow access to login page
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Get user session
  const session = await getSession();

  // Redirect to login if no session
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Extract tenant from the first path segment
  const tenant = pathname.split('/')[1];

  // Validate tenant
  if (tenant && !VALID_TENANTS.includes(tenant)) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // Verify tenant access
  if (tenant && session.tenantId !== tenant) {
    return NextResponse.redirect(new URL(`/${session.tenantId}/dashboard`, request.url));
  }

  // Verify role-based access
  const userRole = session.role;
  
  // Check if user has permission for this route
  const hasPermission = await verifyRoutePermission(pathname, userRole);
  if (!hasPermission) {
    return NextResponse.redirect(new URL(`/${session.tenantId}/dashboard`, request.url));
  }

  // Add session and tenant information to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenant);
  requestHeaders.set('x-user-id', session.id);
  requestHeaders.set('x-user-role', userRole);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};