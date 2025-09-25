import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Verificar se usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Por segurança, retornar sucesso mesmo se usuário não existir
      return NextResponse.json(
        {
          message:
            'Se o email existir, você receberá instruções de recuperação.',
        },
        { status: 200 }
      )
    }

    // Gerar token de recuperação
    const resetToken = crypto.randomUUID()
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: resetToken,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
      },
    })

    // Enviar email de recuperação (temporariamente desabilitado para desenvolvimento)
    if (process.env.NODE_ENV === 'production' && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL!,
          to: user.email,
          subject: 'Recuperação de senha - GB Locações',
          html: `
            <h1>Recuperação de senha</h1>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}">
              Redefinir Senha
            </a>
            <p>Este link expira em 1 hora.</p>
            <p>Se você não solicitou esta recuperação, ignore este email.</p>
          `,
        })
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError)
        // Continue mesmo se o email falhar
      }
    } else {
      console.log('Email de recuperação (desenvolvimento):', {
        to: user.email,
        resetUrl: `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`,
      })
    }

    return NextResponse.json(
      {
        message: 'Se o email existir, você receberá instruções de recuperação.',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Dados inválidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
