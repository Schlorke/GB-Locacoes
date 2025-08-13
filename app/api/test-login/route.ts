import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

// FIX: Dynamic imports to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function POST(request: Request) {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { prisma } = await import('@/lib/prisma')

    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Usuário não encontrado',
        debug: { userExists: false },
      })
    }

    if (!user.password) {
      return NextResponse.json({
        success: false,
        message: 'Usuário sem senha',
        debug: { userExists: true, hasPassword: false },
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    return NextResponse.json({
      success: isValidPassword,
      message: isValidPassword ? 'Credenciais válidas' : 'Senha inválida',
      debug: {
        userExists: true,
        hasPassword: true,
        passwordValid: isValidPassword,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.error('🧪 [TEST-LOGIN] Erro:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
