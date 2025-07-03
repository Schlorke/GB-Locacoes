import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('🧪 [TEST-LOGIN] Testando credenciais para:', email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Usuário não encontrado',
        debug: { userExists: false },
      });
    }

    console.log('🧪 [TEST-LOGIN] Usuário encontrado:', {
      id: user.id,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password,
    });

    if (!user.password) {
      return NextResponse.json({
        success: false,
        message: 'Usuário sem senha',
        debug: { userExists: true, hasPassword: false },
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('🧪 [TEST-LOGIN] Validação da senha:', isValidPassword);

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
    });
  } catch (error) {
    console.error('🧪 [TEST-LOGIN] Erro:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
