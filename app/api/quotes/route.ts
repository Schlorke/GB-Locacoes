import { QuoteRequestSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ZodError } from 'zod'

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Runtime-only Prisma import
async function getPrisma() {
  // Prisma importado estaticamente
  return prisma
}

/**
 * @openapi
 * /api/quotes:
 *   post:
 *     tags: [Quotes]
 *     summary: Solicita orçamento de equipamentos
 *     description: |
 *       Cria uma nova solicitação de orçamento para equipamentos selecionados.
 *
 *       **🌐 Endpoint Público** - Não requer autenticação
 *
 *       **Para IAs**: Use este endpoint para criar orçamentos.
 *       - Todos os campos são obrigatórios exceto 'customerCompany' e 'message'
 *       - O array 'items' deve conter objetos com equipmentId, quantity e days
 *       - O sistema calcula automaticamente preços e totais
 *
 *       **Fluxo**: Orçamento criado → Email enviado → Status PENDING
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: "João Silva"
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 description: Email de contato
 *                 example: "joao@empresa.com.br"
 *               customerPhone:
 *                 type: string
 *                 description: Telefone de contato
 *                 example: "(51) 99999-9999"
 *               customerCompany:
 *                 type: string
 *                 description: Empresa/Construtora (opcional)
 *                 example: "Construtora ABC"
 *               message:
 *                 type: string
 *                 description: Mensagem adicional (opcional)
 *                 example: "Preciso para obra de 15 dias"
 *               items:
 *                 type: array
 *                 description: Lista de equipamentos para orçamento
 *                 items:
 *                   type: object
 *                   properties:
 *                     equipmentId:
 *                       type: string
 *                       description: ID do equipamento
 *                       example: "cme0n8pld0003kytghr9tcl5n"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       description: Quantidade de equipamentos
 *                       example: 2
 *                     days:
 *                       type: integer
 *                       minimum: 1
 *                       description: Número de dias de locação
 *                       example: 10
 *                   required: [equipmentId, quantity, days]
 *             required: [customerName, customerEmail, customerPhone, items]
 *           example:
 *             customerName: "João Silva"
 *             customerEmail: "joao@empresa.com.br"
 *             customerPhone: "(51) 99999-9999"
 *             customerCompany: "Construtora ABC"
 *             message: "Preciso para obra de 15 dias"
 *             items:
 *               - equipmentId: "cme0n8pld0003kytghr9tcl5n"
 *                 quantity: 2
 *                 days: 10
 *               - equipmentId: "cme0n8pld0003kytghr9tcl6o"
 *                 quantity: 1
 *                 days: 15
 *     responses:
 *       201:
 *         description: Orçamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único do orçamento
 *                   example: "quote_cm123456789"
 *                 message:
 *                   type: string
 *                   description: Mensagem de confirmação
 *                   example: "Orçamento criado com sucesso! Entraremos em contato em breve."
 *                 status:
 *                   type: string
 *                   description: Status inicial do orçamento
 *                   example: "PENDING"
 *                 totalValue:
 *                   type: number
 *                   format: float
 *                   description: Valor total calculado
 *                   example: 1850.00
 *                 validUntil:
 *                   type: string
 *                   format: date
 *                   description: Data de validade do orçamento
 *                   example: "2024-02-15"
 *               required: [id, message, status, totalValue]
 *             example:
 *               id: "quote_cm123456789"
 *               message: "Orçamento criado com sucesso! Entraremos em contato em breve."
 *               status: "PENDING"
 *               totalValue: 1850.00
 *               validUntil: "2024-02-15"
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_fields:
 *                 summary: Campos obrigatórios ausentes
 *                 value:
 *                   error: "Campos obrigatórios não preenchidos"
 *               invalid_equipment:
 *                 summary: Equipamento não encontrado
 *                 value:
 *                   error: "Equipamento não encontrado: cme0n8pld0003kytghr9tcl5n"
 *               invalid_quantity:
 *                 summary: Quantidade inválida
 *                 value:
 *                   error: "Quantidade deve ser maior que 0"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Erro interno do servidor"
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação usando schema Zod
    const validatedData = QuoteRequestSchema.parse(body)
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      message,
      items,
    } = validatedData

    // Calcular total
    let totalAmount = 0
    const quoteItems = []

    const prisma = await getPrisma()

    for (const item of items) {
      const equipment = await prisma.equipment.findUnique({
        where: { id: item.equipmentId },
      })

      if (!equipment) {
        return NextResponse.json(
          { error: `Equipamento não encontrado: ${item.equipmentId}` },
          { status: 400 }
        )
      }

      const pricePerDay = Number(equipment.pricePerDay)
      const itemTotal = pricePerDay * item.quantity * (item.days || 1)
      totalAmount += itemTotal

      quoteItems.push({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
        days: item.days || 1,
        pricePerDay: equipment.pricePerDay,
        priceAtTime: equipment.pricePerDay,
        total: itemTotal,
      })
    }

    // Criar orçamento
    const quote = await prisma.quote.create({
      data: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany,
        message,
        total: totalAmount,
        status: 'PENDING', // Fixed: using correct enum value
        items: {
          create: quoteItems,
        },
      },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar orçamento:', error)

    // Tratamento específico para erros de validação Zod
    if (error instanceof ZodError) {
      const firstError = error.issues[0]
      return NextResponse.json(
        {
          error: firstError?.message || 'Dados inválidos',
          field: firstError?.path.join('.') || 'unknown',
          details:
            process.env.NODE_ENV === 'development' ? error.issues : undefined,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
