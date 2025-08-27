import { getPrisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const prisma = await getPrisma()
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
