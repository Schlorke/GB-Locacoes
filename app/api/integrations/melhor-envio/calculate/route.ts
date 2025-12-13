import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const CalculateShippingSchema = z.object({
  from: z.object({
    postal_code: z.string(),
  }),
  to: z.object({
    postal_code: z.string(),
  }),
  products: z.array(
    z.object({
      id: z.string(),
      width: z.number().positive(),
      height: z.number().positive(),
      length: z.number().positive(),
      weight: z.number().positive(),
      quantity: z.number().int().positive().default(1),
    })
  ),
})

/**
 * API para calcular frete usando Melhor Envio
 * Em produção, integrar com API real do Melhor Envio
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CalculateShippingSchema.parse(body)

    const melhorEnvioToken = process.env.MELHOR_ENVIO_TOKEN

    if (!melhorEnvioToken) {
      // Modo mock para desenvolvimento
      return NextResponse.json({
        shippingOptions: [
          {
            id: 'mock-1',
            name: 'Transportadora Padrão',
            company: 'Transportadora GB',
            price: 50.0,
            deliveryTime: '3-5 dias úteis',
            estimatedDays: 4,
          },
          {
            id: 'mock-2',
            name: 'Entrega Expressa',
            company: 'Transportadora GB',
            price: 80.0,
            deliveryTime: '1-2 dias úteis',
            estimatedDays: 2,
          },
        ],
        note: 'Modo mock - configure MELHOR_ENVIO_TOKEN para usar API real',
      })
    }

    // Calcular dimensões totais
    const totalWeight = validatedData.products.reduce(
      (sum, p) => sum + p.weight * p.quantity,
      0
    )
    const totalVolume =
      validatedData.products.reduce(
        (sum, p) =>
          sum + (p.width * p.height * p.length * p.quantity) / 1000000, // cm³ para m³
        0
      ) * 1000 // m³ para kg volumétrico

    const chargeableWeight = Math.max(totalWeight, totalVolume)

    // Chamada real à API do Melhor Envio
    try {
      const response = await fetch(
        'https://melhorenvio.com.br/api/v2/me/shipment/calculate',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${melhorEnvioToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            from: {
              postal_code: validatedData.from.postal_code.replace(/\D/g, ''),
            },
            to: {
              postal_code: validatedData.to.postal_code.replace(/\D/g, ''),
            },
            products: validatedData.products.map((p) => ({
              id: p.id,
              width: p.width,
              height: p.height,
              length: p.length,
              weight: p.weight,
              quantity: p.quantity,
            })),
            services: '1,2,3,4', // IDs dos serviços disponíveis
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Melhor Envio API error: ${response.statusText}`)
      }

      const data = await response.json()

      // Processar resposta do Melhor Envio
      const shippingOptions = data.map((option: unknown) => {
        const opt = option as {
          id: string
          name: string
          company: { name: string }
          price: number
          delivery_time: number
        }
        return {
          id: opt.id,
          name: opt.name,
          company: opt.company.name,
          price: opt.price,
          deliveryTime: `${opt.delivery_time} dias úteis`,
          estimatedDays: opt.delivery_time,
        }
      })

      return NextResponse.json({
        shippingOptions,
        chargeableWeight,
      })
    } catch (apiError) {
      console.error('Melhor Envio API error:', apiError)
      // Fallback para cálculo estimado
      const distance = calculateEstimatedDistance(
        validatedData.from.postal_code,
        validatedData.to.postal_code
      )

      return NextResponse.json({
        shippingOptions: [
          {
            id: 'estimated-1',
            name: 'Frete Estimado',
            company: 'Transportadora GB',
            price: Math.max(30, distance * 0.5 + chargeableWeight * 2),
            deliveryTime: `${Math.ceil(distance / 100)} dias úteis`,
            estimatedDays: Math.ceil(distance / 100),
            note: 'Cálculo estimado - API do Melhor Envio indisponível',
          },
        ],
        chargeableWeight,
      })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error calculating shipping:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Função auxiliar para calcular distância estimada (simplificada)
function calculateEstimatedDistance(fromCEP: string, toCEP: string): number {
  // Em produção, usar API de geocodificação ou cálculo real
  // Por enquanto, retornar valor estimado baseado em CEP
  const fromNum = parseInt(fromCEP.replace(/\D/g, '').substring(0, 5) || '0')
  const toNum = parseInt(toCEP.replace(/\D/g, '').substring(0, 5) || '0')
  return Math.abs(fromNum - toNum) * 0.1 // Estimativa simplificada
}
