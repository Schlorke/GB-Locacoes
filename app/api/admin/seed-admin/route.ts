import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const adminEmail = 'admin@gblocacoes.com.br';
    const adminPassword = 'admin123';
    const adminName = 'Admin';

    // Test database connection first
    try {
      await prisma.$connect();
    } catch (connectError) {
      console.error('❌ [SEED-ADMIN] Erro na conexão Prisma:', connectError);
      throw new Error(
        `Falha na conexão: ${connectError instanceof Error ? connectError.message : 'Unknown error'}`,
      );
    }

    // Test basic query
    try {
      await prisma.user.count();
    } catch (queryError) {
      console.error('❌ [SEED-ADMIN] Erro na query básica:', queryError);
      throw new Error(
        `Falha na query: ${queryError instanceof Error ? queryError.message : 'Unknown error'}`,
      );
    }

    // Check if admin user already exists
    let existingAdmin;
    try {
      existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
      });
    } catch (findError) {
      console.error('❌ [SEED-ADMIN] Erro ao buscar admin existente:', findError);
      throw new Error(
        `Falha ao verificar admin: ${findError instanceof Error ? findError.message : 'Unknown error'}`,
      );
    }

    if (existingAdmin) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Admin já existe',
          data: {
            email: existingAdmin.email,
            name: existingAdmin.name,
            role: existingAdmin.role,
            createdAt: existingAdmin.createdAt,
          },
        },
        { status: 409 },
      );
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(adminPassword, 12);
    } catch (hashError) {
      console.error('❌ [SEED-ADMIN] Erro ao gerar hash:', hashError);
      throw new Error(
        `Falha no hash: ${hashError instanceof Error ? hashError.message : 'Unknown error'}`,
      );
    }

    // Create admin user
    let adminUser;
    try {
      adminUser = await prisma.user.create({
        data: {
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: UserRole.ADMIN,
          emailVerified: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          emailVerified: true,
        },
      });
    } catch (createError) {
      console.error('❌ [SEED-ADMIN] Erro ao criar admin:', createError);
      const errorDetails =
        createError instanceof Error
          ? {
              name: createError.name,
              message: createError.message,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: (createError as any).code,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              meta: (createError as any).meta,
            }
          : { message: 'Unknown error' };
      console.error('❌ [SEED-ADMIN] Detalhes do erro:', errorDetails);
      throw new Error(
        `Falha ao criar admin: ${createError instanceof Error ? createError.message : 'Unknown error'}`,
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: 'Admin criado com sucesso',
        data: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          createdAt: adminUser.createdAt,
          emailVerified: adminUser.emailVerified,
        },
        credentials: {
          email: adminEmail,
          password: adminPassword,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('💥 [SEED-ADMIN] ERRO GERAL:', error);
    if (error instanceof Error) {
      console.error('💥 [SEED-ADMIN] Stack trace:', error.stack);
    }

    const errorDetails =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: (error as any).code || 'NO_CODE',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
          }
        : {
            name: 'Unknown',
            message: 'Unknown error',
            code: 'NO_CODE',
          };

    console.error('📋 [SEED-ADMIN] Detalhes completos do erro:', errorDetails);

    return NextResponse.json(
      {
        status: 'error',
        message: `Erro interno: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error: 'INTERNAL_SERVER_ERROR',
        details: errorDetails,
      },
      { status: 500 },
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('⚠️ [SEED-ADMIN] Erro ao desconectar Prisma:', disconnectError);
    }
  }
}

// GET method remains the same
export async function GET() {
  try {
    const adminEmail = 'admin@gblocacoes.com.br';

    await prisma.$connect();

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        emailVerified: true,
      },
    });

    if (existingAdmin) {
      return NextResponse.json({
        status: 'success',
        message: 'Admin encontrado',
        exists: true,
        data: existingAdmin,
      });
    } else {
      return NextResponse.json({
        status: 'info',
        message: 'Admin não encontrado',
        exists: false,
        data: null,
      });
    }
  } catch (error) {
    console.error('❌ [SEED-ADMIN-GET] Erro ao verificar admin:', error);

    const errorDetails =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: (error as any).code || 'NO_CODE',
          }
        : {
            name: 'Unknown',
            message: 'Unknown error',
            code: 'NO_CODE',
          };

    return NextResponse.json(
      {
        status: 'error',
        message: 'Erro ao verificar admin',
        error: 'VERIFICATION_ERROR',
        details: errorDetails,
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
