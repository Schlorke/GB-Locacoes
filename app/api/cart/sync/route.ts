import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            equipment: {
              include: { category: true },
            },
          },
        },
      },
    });

    if (!userCart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(userCart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar carrinho' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { items } = await request.json();

    // Buscar ou criar carrinho do usuário
    let userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    // Limpar itens existentes
    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });

    // Adicionar novos itens
    for (const item of items) {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          equipmentId: item.equipmentId,
          quantity: item.quantity,
          days: item.days,
          pricePerDay: item.pricePerDay,
          finalPrice: item.finalPrice,
        },
      });
    }

    return NextResponse.json({ message: 'Carrinho sincronizado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao sincronizar carrinho' },
      { status: 500 }
    );
  }
}
