import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE - Deletar todas as notificações lidas
export async function DELETE(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Deletar todas as notificações lidas
    const result = await prisma.notification.deleteMany({
      where: {
        userId,
        isRead: true,
      },
    })

    return NextResponse.json({
      success: true,
      count: result.count,
    })
  } catch (error) {
    console.error('Error deleting read notifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
