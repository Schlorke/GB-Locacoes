import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';

/**
 * Configura o bucket de imagens no Supabase Storage
 * Execute esta função uma vez para criar o bucket necessário
 */
export async function setupSupabaseStorage() {
  try {
    // Verificar se o bucket já existe (usando cliente admin)
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();

    if (listError) {
      console.error('Erro ao listar buckets:', listError);
      return { success: false, error: listError.message };
    }

    const bucketName = 'gb-locacoes-images';
    const bucketExists = buckets?.some((bucket) => bucket.name === bucketName);

    if (bucketExists) {
      return { success: true, message: 'Bucket já configurado' };
    }

    // Criar o bucket (usando cliente admin)
    const { data, error } = await supabaseAdmin.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (error) {
      console.error('Erro ao criar bucket:', error);
      return { success: false, error: error.message };
    }

    // Desabilitar RLS para o bucket recém-criado
    try {
      await supabaseAdmin.rpc('exec_sql', {
        sql_query: `
          INSERT INTO storage.buckets (id, name, public)
          VALUES ('${bucketName}', '${bucketName}', true)
          ON CONFLICT (id) 
          DO UPDATE SET public = true;
          
          -- Criar política simples para permitir todas as operações
          DROP POLICY IF EXISTS "Allow all operations on ${bucketName}" ON storage.objects;
          CREATE POLICY "Allow all operations on ${bucketName}" ON storage.objects 
          FOR ALL USING (bucket_id = '${bucketName}');
        `,
      });
    } catch (policyError) {
      // Se não conseguir criar as políticas, continua mas avisa
      console.warn('Aviso: Não foi possível configurar políticas RLS:', policyError);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro inesperado:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Utilitário para testar upload no Supabase
 */
export async function testSupabaseUpload() {
  try {
    // Criar um arquivo de teste
    const testContent = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG header
    const testPath = 'test/test-image.png';

    const { error } = await supabase.storage
      .from('gb-locacoes-images')
      .upload(testPath, testContent, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      return { success: false, error: error.message };
    }

    // Obter URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from('gb-locacoes-images').getPublicUrl(testPath);

    // Limpar arquivo de teste
    await supabase.storage.from('gb-locacoes-images').remove([testPath]);

    return {
      success: true,
      message: 'Upload testado com sucesso',
      testUrl: publicUrl,
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
