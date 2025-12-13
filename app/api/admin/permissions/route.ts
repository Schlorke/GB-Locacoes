import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Role } from '@prisma/client'

const UpdatePermissionsSchema = z.object({
  permissions: z.array(
    z.object({
      role: z.enum(['ADMIN', 'CLIENT']),
      module: z.string(),
      action: z.string(),
    })
  ),
})

// GET - Listar permissões
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const permissions = await prisma.permission.findMany({
      orderBy: [{ role: 'asc' }, { module: 'asc' }, { action: 'asc' }],
    })

    return NextResponse.json({ permissions })
  } catch (error) {
    console.error('Error fetching permissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar permissões
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = UpdatePermissionsSchema.parse(body)

    // Extrair role das permissões (todas devem ser do mesmo role)
    const role = validatedData.permissions[0]?.role as Role
    if (!role) {
      return NextResponse.json(
        { error: 'At least one permission is required' },
        { status: 400 }
      )
    }

    // Não permitir modificar permissões de ADMIN
    if (role === Role.ADMIN) {
      return NextResponse.json(
        { error: 'Cannot modify ADMIN permissions' },
        { status: 400 }
      )
    }

    // Deletar todas as permissões existentes do role
    await prisma.permission.deleteMany({
      where: { role },
    })

    // Criar novas permissões
    if (validatedData.permissions.length > 0) {
      await prisma.permission.createMany({
        data: validatedData.permissions.map((p) => ({
          role: p.role as Role,
          module: p.module,
          action: p.action,
        })),
        skipDuplicates: true,
      })
    }

    const updatedPermissions = await prisma.permission.findMany({
      where: { role },
    })

    return NextResponse.json({
      success: true,
      permissions: updatedPermissions,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error updating permissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
