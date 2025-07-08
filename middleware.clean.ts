import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Middleware customizado que usa NextAuth para todas as rotas admin
export default withAuth(
  function middleware(_req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to login page without authentication
        if (pathname === '/admin/login') {
          return true;
        }

        // Allow access to debug pages in development
        if (pathname.startsWith('/debug') && process.env.NODE_ENV === 'development') {
          return true;
        }

        // For admin routes, require valid token
        if (pathname.startsWith('/admin')) {
          return !!token;
        }

        // Allow all other routes (public routes)
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/admin/:path*'],
};
