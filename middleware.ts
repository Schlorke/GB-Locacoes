import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to login page without authentication
        if (pathname === "/admin/login") {
          return true
        }

        // Allow access to setup pages without authentication
        if (pathname === "/setup" || pathname === "/setup-db") {
          return true
        }

        // Allow access to debug pages in development
        if (pathname.startsWith("/debug") && process.env.NODE_ENV === "development") {
          return true
        }

        // For admin routes, require authentication
        if (pathname.startsWith("/admin")) {
          return !!token
        }

        // Allow all other routes (public routes)
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/admin/:path*", "/setup/:path*", "/debug/:path*"],
}
