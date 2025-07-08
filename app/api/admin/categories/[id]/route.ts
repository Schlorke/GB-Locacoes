import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, icon, iconColor, bgColor, fontColor } = body;

    const data: {
      name?: string;
      slug?: string;
      description?: string;
      icon?: string;
      iconColor?: string;
      bgColor?: string;
      fontColor?: string;
    } = {};
    if (name) {
      data.name = name.trim();
      data.slug = slugify(name);
    }
    if (description !== undefined) data.description = description?.trim() || null;
    if (icon !== undefined) data.icon = icon?.trim() || null;
    if (iconColor !== undefined) data.iconColor = iconColor?.trim() || '#000000';
    if (bgColor !== undefined) data.bgColor = bgColor?.trim() || '#e0e0e0';
    if (fontColor !== undefined) data.fontColor = fontColor?.trim() || '#000000';

    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Erro ao atualizar categoria' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: 'Categoria excluída' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Erro ao excluir categoria' }, { status: 500 });
  }
}
