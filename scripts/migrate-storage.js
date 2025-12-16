/**
 * 🔄 Script de Migração de Storage Supabase
 *
 * Este script migra TODOS os arquivos de um bucket Supabase antigo para um novo,
 * preservando a estrutura completa de diretórios e nomes de arquivos.
 *
 * 📋 PROPÓSITO:
 * - Migrar imagens/arquivos entre projetos Supabase (ex: de teste para produção)
 * - Fazer backup completo do storage antes de mudanças críticas
 * - Replicar bucket entre contas Supabase diferentes
 *
 * ⚙️ VARIÁVEIS DE AMBIENTE NECESSÁRIAS (.env):
 * - SUPABASE_URL_OLD: URL do projeto Supabase de origem
 * - SUPABASE_SERVICE_ROLE_KEY_OLD: Service Role Key do projeto antigo (permissões totais)
 * - SUPABASE_URL_NEW: URL do projeto Supabase de destino
 * - SUPABASE_SERVICE_ROLE_KEY_NEW: Service Role Key do projeto novo (permissões totais)
 *
 * 🚀 COMO USAR:
 * 1. Configure as variáveis de ambiente no .env
 * 2. Execute: node scripts/migrate-storage.js
 * 3. Aguarde a migração completa (logs mostram progresso)
 *
 * ⚠️ IMPORTANTE:
 * - O bucket 'gb-locacoes-images' deve existir em AMBOS os projetos
 * - Service Role Keys têm permissões totais - mantenha-as seguras
 * - O script usa 'upsert: true' - arquivos existentes serão SOBRESCRITOS
 * - Migração é recursiva - copia TODAS as pastas e subpastas
 *
 * 📝 LOGS:
 * - "Migrado: <caminho>" = arquivo migrado com sucesso
 * - "Erro ao listar/baixar/subir" = erro específico (continua para próximo arquivo)
 * - "✅ Migração COMPLETA finalizada" = processo concluído
 *
 * 🐛 TROUBLESHOOTING:
 * - Erro "Bucket not found": Verifique se o bucket existe em ambos projetos
 * - Erro "Invalid API key": Verifique as Service Role Keys no .env
 * - Erro "Permission denied": Service Role Key não tem permissões suficientes
 *
 * 📚 DOCUMENTAÇÃO COMPLETA:
 * - docs/internal/migrate-storage-script.md
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// Cliente Supabase ANTIGO (origem dos arquivos)
const supabaseOld = createClient(
  process.env.SUPABASE_URL_OLD,
  process.env.SUPABASE_SERVICE_ROLE_KEY_OLD
)

// Cliente Supabase NOVO (destino dos arquivos)
const supabaseNew = createClient(
  process.env.SUPABASE_URL_NEW,
  process.env.SUPABASE_SERVICE_ROLE_KEY_NEW
)

// Nome do bucket que será migrado (deve existir em ambos projetos)
const BUCKET = 'gb-locacoes-images'

/**
 * Migra recursivamente uma pasta e todo seu conteúdo
 * @param {string} path - Caminho da pasta (vazio = raiz do bucket)
 */
async function migrateFolder(path = '') {
  // Lista todos os itens na pasta atual (limite de 1000 por página)
  const { data, error } = await supabaseOld.storage
    .from(BUCKET)
    .list(path, { limit: 1000 })

  if (error) {
    console.error('Erro ao listar:', path, error)
    return
  }

  // Processa cada item encontrado
  for (const item of data) {
    // Monta o caminho completo (incluindo subpastas)
    const fullPath = path ? `${path}/${item.name}` : item.name

    if (item.metadata) {
      // ✅ É ARQUIVO → faz download do antigo e upload no novo
      const { data: file, error: downloadError } = await supabaseOld.storage
        .from(BUCKET)
        .download(fullPath)

      if (downloadError) {
        console.error('Erro ao baixar', fullPath, downloadError)
        continue // Pula para próximo arquivo
      }

      // Upload no novo Supabase (upsert: true = sobrescreve se já existir)
      const { error: uploadError } = await supabaseNew.storage
        .from(BUCKET)
        .upload(fullPath, file, { upsert: true })

      if (uploadError) {
        console.error('Erro ao subir', fullPath, uploadError)
        continue // Pula para próximo arquivo
      }

      console.log('Migrado:', fullPath)
    } else {
      // 📁 É PASTA → entra recursivamente nela
      await migrateFolder(fullPath)
    }
  }
}

migrateFolder()
  .then(() => console.log('✅ Migração COMPLETA finalizada'))
  .catch(console.error)
