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

  // Em produção, fazer chamada real à API do ZapSign
  // Por enquanto, retornar mock
  try {
    // Exemplo de chamada real (descomentar quando tiver token):
    /*
    const response = await fetch('https://api.zapsign.com.br/api/v1/docs/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${client.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        content,
        signers,
      }),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar documento no ZapSign')
    }

    return await response.json()
    */

    // Mock para desenvolvimento
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
