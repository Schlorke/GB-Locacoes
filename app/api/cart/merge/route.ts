import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { localCartItems } = await request.json()

    // Buscar ou criar carrinho do usuário
    let userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { userId: session.user.id },
        include: { items: true },
      })
    }

    // Mesclar itens
    for (const localItem of localCartItems) {
      const existingItem = userCart.items.find(
        (item) => item.equipmentId === localItem.equipmentId
      )

      if (existingItem) {
        // Atualizar item existente
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: localItem.quantity,
            days: localItem.days,
            pricePerDay: localItem.pricePerDay,
            finalPrice: localItem.finalPrice,
          },
        })
      } else {
        // Criar novo item
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            equipmentId: localItem.equipmentId,
            quantity: localItem.quantity,
            days: localItem.days,
            pricePerDay: localItem.pricePerDay,
            finalPrice: localItem.finalPrice,
          },
        })
      }
    }

    // Retornar carrinho atualizado
    const updatedCart = await prisma.cart.findUnique({
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
    })

    return NextResponse.json(updatedCart)
  } catch {
    return NextResponse.json(
      { error: 'Erro ao mesclar carrinho' },
      { status: 500 }
    )
  }
}
