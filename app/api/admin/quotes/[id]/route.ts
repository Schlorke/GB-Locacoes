import { type NextRequest, NextResponse } from 'next/server'

// FIX: Dynamic imports to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during 
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Dynamic imports - only load at runtime, never during build
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')

    const session = await getServerSession(authOptions)

    if (!session?.user || !['ADMIN', 'OPERATOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                description: true,
                pricePerDay: true,
                images: true,
                category: {
                  select: {
                    name: true,
                    iconColor: true,
                    bgColor: true,
                    fontColor: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Error fetching quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Dynamic imports - only load at runtime, never during build
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')

    const session = await getServerSession(authOptions)

    if (!session?.user || !['ADMIN', 'OPERATOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status, ...updateData } = body

    const quote = await prisma.quote.update({
      where: { id: params.id },
      data: {
        ...updateData,
        status,
        updatedAt: new Date(),
      },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Error updating quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Dynamic imports - only load at runtime, never during build
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')

    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.quote.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Quote deleted successfully' })
  } catch (error) {
    console.error('Error deleting quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}