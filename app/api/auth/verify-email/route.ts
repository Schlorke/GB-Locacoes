import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(
      new URL('/login?error=token-missing', request.url)
    )
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.redirect(
        new URL('/login?error=token-expired', request.url)
      )
    }

    // Atualizar usuário como verificado
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    })

    // Deletar token usado
    await prisma.verificationToken.delete({
      where: { token },
    })

    return NextResponse.redirect(new URL('/login?verified=true', request.url))
  } catch {
    return NextResponse.redirect(
      new URL('/login?error=verification-failed', request.url)
    )
  }
}
