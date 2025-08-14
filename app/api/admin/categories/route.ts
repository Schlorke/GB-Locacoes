import { NextResponse, type NextRequest } from 'next/server'
import crypto from 'node:crypto'
import { z } from 'zod'

// FIX: Dynamic imports to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const CategorySchema = z
  .object({
    name: z.string().min(1, 'O nome da categoria é obrigatório'),
    description: z.string().optional(),
    icon: z.string().optional().nullable(),
    iconColor: z.string().min(1, 'Cor do ícone é obrigatória'),
    bgColor: z.string().min(1, 'Cor de fundo é obrigatória'),
    fontColor: z.string().min(1, 'Cor da fonte é obrigatória'),
  })
  .strict()

// GET /api/admin/categories - List all categories
export async function GET(request: NextRequest) {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { requireAdmin } = await import('@/middlewares/require-admin')
    const { prisma } = await import('@/lib/prisma')

    // Verificar autenticação de admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            equipments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { requireAdmin } = await import('@/middlewares/require-admin')
    const { prisma } = await import('@/lib/prisma')

    // Verificar autenticação de admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }
    if (!process.env.DATABASE_URL) {
      console.error('[API POST /admin/categories] DATABASE_URL não definido')
      return NextResponse.json(
        { error: 'Configuração do banco de dados ausente.' },
        { status: 500 }
      )
    }

    let raw
    try {
      raw = await request.json()
    } catch (_err) {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
    }

    if (!raw.icon) delete raw.icon

    let parsed
    try {
      parsed = CategorySchema.parse(raw)
    } catch (err) {
      console.error('[CATEGORY_ERROR]', err)
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const { name, description, icon, iconColor, bgColor, fontColor } = parsed

    const slug = slugify(name)

    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: { equals: name.trim(), mode: 'insensitive' } }, { slug }],
      },
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Categoria já existente' },
        { status: 409 }
      )
    }

    const category = await prisma.category.create({
      data: {
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description?.trim() || null,
        icon: icon?.trim() || null,
        iconColor: iconColor?.trim() || '#000000',
        bgColor: bgColor?.trim() || '#e0e0e0',
        fontColor: fontColor?.trim() || '#000000',
        slug,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)

    if (error instanceof Error && 'code' in error) {
      const prismaError = error as Error & { code: string; meta?: unknown }
      console.error(
        '[API POST /admin/categories] Prisma error:',
        prismaError.code,
        error.message
      )

      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { error: 'Categoria já existente' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: 'Erro ao processar dados da categoria.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    )
  }
}
