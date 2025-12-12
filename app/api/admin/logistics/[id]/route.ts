import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { DeliveryStatus } from '@prisma/client'
import { Prisma } from '@prisma/client'

const UpdateDeliverySchema = z.object({
  status: z
    .enum(['SCHEDULED', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED', 'FAILED'])
    .optional(),
  completedAt: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  photos: z.array(z.string()).optional(),
  checklist: z.record(z.string(), z.unknown()).optional(),
  notes: z.string().optional(),
})

// PATCH - Atualizar entrega/coleta
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = UpdateDeliverySchema.parse(body)

    const updateData: Prisma.DeliveryUpdateInput = {}
    if (validatedData.status)
      updateData.status = validatedData.status as DeliveryStatus
    if (validatedData.completedAt)
      updateData.completedAt = validatedData.completedAt
    if (validatedData.photos) updateData.photos = validatedData.photos
    if (validatedData.checklist)
      updateData.checklist = validatedData.checklist as Prisma.InputJsonValue
    if (validatedData.notes !== undefined)
      updateData.notes = validatedData.notes

    // Se foi completada, atualizar data de conclusão
    if (validatedData.status === 'COMPLETED' && !validatedData.completedAt) {
      updateData.completedAt = new Date()
    }

    const delivery = await prisma.delivery.update({
      where: { id: params.id },
      data: updateData,
      include: {
        rental: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ delivery })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error updating delivery:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
