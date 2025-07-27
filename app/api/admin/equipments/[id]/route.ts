import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/middlewares/require-admin';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const adminResult = await requireAdmin(request);
    if (!adminResult.success) {
      return NextResponse.json({ error: adminResult.error }, { status: adminResult.status });
    }

    const equipment = await prisma.equipment.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    });

    if (!equipment) {
      return NextResponse.json({ error: 'Equipamento não encontrado' }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const adminResult = await requireAdmin(request);
    if (!adminResult.success) {
      return NextResponse.json({ error: adminResult.error }, { status: adminResult.status });
    }

    const body = await request.json();
    const { name, description, specifications, pricePerDay, categoryId, images, isAvailable } =
      body;

    const equipment = await prisma.equipment.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(specifications && { specifications }),
        ...(pricePerDay && { pricePerDay: parseFloat(pricePerDay) }),
        ...(categoryId && { categoryId }),
        ...(images && images.length > 0 && { images: { set: images } }),
        ...(isAvailable !== undefined && { isAvailable }),
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const adminResult = await requireAdmin(request);
    if (!adminResult.success) {
      return NextResponse.json({ error: adminResult.error }, { status: adminResult.status });
    }

    await prisma.equipment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Equipamento removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover equipamento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
