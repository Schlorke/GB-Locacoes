/**
 * Utilitário para cálculo de frete
 */

export interface FreightCalculationRequest {
  fromCEP: string
  toCEP: string
  equipmentIds: string[]
  quantities: number[]
}

export interface FreightOption {
  id: string
  name: string
  company: string
  price: number
  deliveryTime: string
  estimatedDays: number
}

export interface FreightCalculationResult {
  shippingOptions: FreightOption[]
  chargeableWeight?: number
  note?: string
}

/**
 * Calcula frete usando API do Melhor Envio ou fallback
 */
export async function calculateFreight(
  request: FreightCalculationRequest
): Promise<FreightCalculationResult> {
  // Por enquanto, retorna cálculo mockado
  // Em produção, integrar com API real do Melhor Envio
  // ou usar endpoint /api/integrations/melhor-envio/calculate

  const cleanFromCEP = request.fromCEP.replace(/\D/g, '')
  const cleanToCEP = request.toCEP.replace(/\D/g, '')

  if (cleanFromCEP.length !== 8 || cleanToCEP.length !== 8) {
    return {
      shippingOptions: [],
      note: 'CEP inválido',
    }
  }

  // Calcular distância estimada (simplificado)
  const fromNum = parseInt(cleanFromCEP.substring(0, 5) || '0')
  const toNum = parseInt(cleanToCEP.substring(0, 5) || '0')
  const distance = Math.abs(fromNum - toNum) * 0.1

  // Peso estimado baseado na quantidade de equipamentos
  const totalQuantity = request.quantities.reduce((sum, qty) => sum + qty, 0)
  const estimatedWeight = totalQuantity * 50 // 50kg por equipamento (estimativa)

  // Calcular frete baseado em distância e peso
  const basePrice = Math.max(30, distance * 0.5 + estimatedWeight * 0.1)
  const expressPrice = basePrice * 1.5

  return {
    shippingOptions: [
      {
        id: 'standard',
        name: 'Transportadora Padrão',
        company: 'Transportadora GB',
        price: Math.round(basePrice * 100) / 100,
        deliveryTime: `${Math.max(3, Math.ceil(distance / 100))} dias úteis`,
        estimatedDays: Math.max(3, Math.ceil(distance / 100)),
      },
      {
        id: 'express',
        name: 'Entrega Expressa',
        company: 'Transportadora GB',
        price: Math.round(expressPrice * 100) / 100,
        deliveryTime: `${Math.max(1, Math.ceil(distance / 200))} dias úteis`,
        estimatedDays: Math.max(1, Math.ceil(distance / 200)),
      },
    ],
    chargeableWeight: estimatedWeight,
    note: 'Cálculo estimado - valores podem variar',
  }
}

/**
 * Calcula frete usando API do Melhor Envio (quando disponível)
 */
export async function calculateFreightWithAPI(
  request: FreightCalculationRequest,
  equipmentDimensions: Array<{
    width: number
    height: number
    length: number
    weight: number
  }>
): Promise<FreightCalculationResult> {
  try {
    const response = await fetch('/api/integrations/melhor-envio/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: {
          postal_code: request.fromCEP.replace(/\D/g, ''),
        },
        to: {
          postal_code: request.toCEP.replace(/\D/g, ''),
        },
        products: equipmentDimensions.map((dim, index) => ({
          id: request.equipmentIds[index] || `eq-${index}`,
          width: dim.width,
          height: dim.height,
          length: dim.length,
          weight: dim.weight,
          quantity: request.quantities[index] || 1,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error('Erro ao calcular frete')
    }

    const data = await response.json()
    return {
      shippingOptions: data.shippingOptions || [],
      chargeableWeight: data.chargeableWeight,
      note: data.note,
    }
  } catch (error) {
    console.error('Erro ao calcular frete com API:', error)
    // Fallback para cálculo estimado
    return calculateFreight(request)
  }
}
