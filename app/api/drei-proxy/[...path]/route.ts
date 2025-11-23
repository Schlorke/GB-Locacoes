import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy para recursos do drei-assets do GitHub
 * Cacheia as requisições para evitar rate limiting (429)
 *
 * Uso: /api/drei-proxy/hdri/forest_slope_1k.hdr
 * Redireciona para: https://raw.githubusercontent.com/pmndrs/drei-assets/.../hdri/forest_slope_1k.hdr
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/')
    const githubUrl = `https://raw.githubusercontent.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/${path}`

    // Fazer requisição ao GitHub com cache do servidor
    const response = await fetch(githubUrl, {
      headers: {
        'User-Agent': 'GB-Locacoes/1.0',
      },
      // Cache no servidor da Vercel
      next: { revalidate: 31536000 }, // 1 ano
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch resource' },
        { status: response.status }
      )
    }

    // Obter conteúdo
    const contentType =
      response.headers.get('content-type') || 'application/octet-stream'
    const buffer = await response.arrayBuffer()

    // Retornar com headers de cache agressivo
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('Drei proxy error:', error)
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 })
  }
}
