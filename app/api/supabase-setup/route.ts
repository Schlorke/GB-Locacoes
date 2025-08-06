import { setupSupabaseStorage, testSupabaseUpload } from '@/lib/supabase-setup'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (action === 'setup') {
      const result = await setupSupabaseStorage()
      return NextResponse.json(result)
    }

    if (action === 'test') {
      const result = await testSupabaseUpload()
      return NextResponse.json(result)
    }

    return NextResponse.json(
      { error: 'Ação inválida. Use "setup" ou "test"' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Erro na API de setup:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API de configuração do Supabase Storage',
    endpoints: {
      'POST /api/supabase-setup': {
        description: 'Configura ou testa o Supabase Storage',
        body: {
          action: '"setup" para criar bucket | "test" para testar upload',
        },
      },
    },
  })
}
