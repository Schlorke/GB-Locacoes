import { supabaseAdmin } from './supabase-admin'

const BUCKET_NAME = 'gb-locacoes-images'

/**
 * Extrai o caminho do arquivo de uma URL do Supabase Storage
 *
 * @param url - URL completa do Supabase (ex: https://xxx.supabase.co/storage/v1/object/public/gb-locacoes-images/equipments/file.jpg)
 * @returns Caminho relativo do arquivo (ex: equipments/file.jpg) ou null se não for uma URL válida
 */
export function extractFilePathFromSupabaseUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  try {
    // Padrão de URL do Supabase Storage:
    // https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const urlPattern = /\/storage\/v1\/object\/public\/[^/]+\/(.+)$/
    const match = url.match(urlPattern)

    if (match && match[1]) {
      // Decodifica caracteres especiais na URL (ex: %20 -> espaço)
      return decodeURIComponent(match[1])
    }

    // Fallback: Se a URL já é um caminho relativo (sem protocolo)
    if (!url.includes('://') && !url.startsWith('/')) {
      return url
    }

    return null
  } catch (error) {
    console.error('Erro ao extrair caminho da URL:', error)
    return null
  }
}

/**
 * Remove um arquivo do Supabase Storage
 *
 * @param fileUrl - URL completa ou caminho relativo do arquivo
 * @returns Sucesso da operação e detalhes do erro (se houver)
 */
export async function deleteFileFromStorage(
  fileUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const filePath = extractFilePathFromSupabaseUrl(fileUrl)

    if (!filePath) {
      console.warn(`URL inválida ou não é do Supabase Storage: ${fileUrl}`)
      return {
        success: false,
        error: 'URL inválida ou não é do Supabase Storage',
      }
    }

    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      console.error(`Erro ao remover arquivo ${filePath}:`, error)

      // Se o arquivo já não existe, não é um erro crítico
      if (
        error.message?.includes('not found') ||
        error.message?.includes('No such file')
      ) {
        console.warn(`Arquivo não encontrado (já foi removido?): ${filePath}`)
        return { success: true } // Considera sucesso se já não existe
      }

      return {
        success: false,
        error: error.message || 'Erro desconhecido ao remover arquivo',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Erro inesperado ao remover arquivo:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Remove múltiplos arquivos do Supabase Storage
 *
 * @param fileUrls - Array de URLs completas ou caminhos relativos
 * @returns Resultado da operação com contadores de sucesso/falha
 */
export async function deleteFilesFromStorage(fileUrls: string[]): Promise<{
  success: boolean
  deleted: number
  failed: number
  errors: Array<{ url: string; error: string }>
}> {
  if (!fileUrls || fileUrls.length === 0) {
    return { success: true, deleted: 0, failed: 0, errors: [] }
  }

  const results = await Promise.allSettled(
    fileUrls.map((url) => deleteFileFromStorage(url))
  )

  let deleted = 0
  let failed = 0
  const errors: Array<{ url: string; error: string }> = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      deleted++
    } else {
      failed++
      const errorMessage =
        result.status === 'rejected'
          ? result.reason?.message || String(result.reason)
          : result.value.error || 'Erro desconhecido'
      errors.push({ url: fileUrls[index] || '', error: errorMessage })
    }
  })

  return {
    success: failed === 0,
    deleted,
    failed,
    errors,
  }
}
