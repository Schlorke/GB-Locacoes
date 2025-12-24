import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import getResend from '@/lib/resend'
import { prisma } from '@/lib/prisma'
const resend = getResend()

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

    const fromEmail = process.env.FROM_EMAIL
    const appUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin
    const resetUrl = `${appUrl}/reset-password?token=${resetToken}`

    // Enviar email de recuperacao quando o Resend estiver configurado
    if (resend && fromEmail) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: user.email,
          subject: 'Recuperacao de senha - GB Locacoes',
          html: `
            <h1>Recuperacao de senha</h1>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetUrl}">
              Redefinir Senha
            </a>
            <p>Este link expira em 1 hora.</p>
            <p>Se voce nao solicitou esta recuperacao, ignore este email.</p>
          `,
        })
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError)
        // Continue mesmo se o email falhar
      }
    } else {
      console.warn(
        'Resend nao configurado ou FROM_EMAIL ausente - email nao enviado.'
      )
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
