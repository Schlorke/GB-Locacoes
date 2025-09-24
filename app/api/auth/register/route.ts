import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  cep: z.string().optional(),
}).refine((data) => data.cpf || data.cnpj, {
  message: 'CPF ou CNPJ é obrigatório',
  path: ['cpf'],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(validatedData.password, 12);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        phone: validatedData.phone,
        cpf: validatedData.cpf,
        cnpj: validatedData.cnpj,
      },
    });

    // Gerar token de verificação
    const verificationToken = crypto.randomUUID();
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      },
    });

    // Enviar email de verificação
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: user.email,
      subject: 'Verifique seu email - GB Locações',
      html: `
        <h1>Bem-vindo à GB Locações!</h1>
        <p>Clique no link abaixo para verificar seu email:</p>
        <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}">
          Verificar Email
        </a>
        <p>Este link expira em 24 horas.</p>
      `,
    });

    return NextResponse.json(
      { message: 'Usuário criado com sucesso. Verifique seu email.' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
