import { supabaseAdmin } from '@/lib/supabase-admin'
import { randomUUID } from 'crypto'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Iniciando upload...')

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.log('❌ Nenhum arquivo enviado')
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    console.log(
      `📁 Arquivo recebido: ${file.name} (${file.size} bytes, ${file.type})`
    )

    // Validar tipo de arquivo
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Use: JPG, PNG, WebP ou GIF' },
        { status: 400 }
      )
    }

    // Validar tamanho (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 5MB' },
        { status: 400 }
      )
    }

    // Gerar nome único para o arquivo
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const fileName = `equipment-${randomUUID()}.${fileExtension}`
    const filePath = `equipments/${fileName}`

    // Converter o arquivo para ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

    console.log(
      `📤 Tentando upload para Supabase: bucket=gb-locacoes-images, path=${filePath}`
    )

    // Upload para Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('gb-locacoes-images')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('❌ Erro no upload do Supabase:', error)
      console.error('📋 Detalhes do erro:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })

      // Se o bucket não existir, retorna erro específico
      if (error.message?.includes('Bucket not found')) {
        console.log('🚫 Bucket não encontrado')
        return NextResponse.json(
          {
            error:
              'Bucket de armazenamento não configurado. Verifique a configuração do Supabase.',
          },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem no Supabase' },
        { status: 500 }
      )
    }

    console.log('✅ Upload realizado com sucesso:', data)

    // Obter URL pública da imagem
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from('gb-locacoes-images').getPublicUrl(data.path)

    return NextResponse.json({
      url: publicUrl,
      filename: fileName,
      size: file.size,
      success: true,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    )
  }
}
