import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// FIX: Dynamic runtime to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
