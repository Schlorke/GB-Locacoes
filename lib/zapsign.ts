export interface ZapsignClient {
  token: string
}

export interface ZapSignSigner {
  email: string
  name: string
  action: 'SIGN' | 'WITNESS' | 'PARTY'
}

export interface ZapSignDocument {
  id: string
  name: string
  status: string
  url?: string
}

export const createZapsignClient = (): ZapsignClient => {
  const token = process.env.ZAPSIGN_TOKEN ?? ''
  return { token }
}

/**
 * Cria um documento no ZapSign para assinatura
 */
export async function createZapSignDocument({
  name,
  content: _content,
  signers: _signers,
}: {
  name: string
  content: string
  signers: ZapSignSigner[]
}): Promise<ZapSignDocument> {
  const client = createZapsignClient()

  if (!client.token) {
    throw new Error('ZapSign token não configurado')
  }

  // Fazer chamada real à API do ZapSign se token estiver configurado
  try {
    if (client.token && process.env.NODE_ENV === 'production') {
      // Chamada real à API do ZapSign
      const response = await fetch('https://api.zapsign.com.br/api/v1/docs/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${client.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          content: _content,
          signers: _signers,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          `Erro ao criar documento no ZapSign: ${errorData.message || response.statusText}`
        )
      }

      const data = await response.json()
      return {
        id: data.id || data.doc_token,
        name: data.name || name,
        status: data.status || 'PENDING',
        url: data.url || data.link || undefined,
      }
    }

    // Mock para desenvolvimento ou quando token não está configurado
    return {
      id: `zapsign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      status: 'PENDING',
      url: `https://zapsign.com.br/doc/${Date.now()}`,
    }
  } catch (error) {
    console.error('Error creating ZapSign document:', error)
    throw error
  }
}
