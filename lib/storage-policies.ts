import { supabaseAdmin } from './supabase-admin';

/**
 * Configura as políticas de RLS para o bucket de imagens
 */
export async function setupStoragePolicies() {
  try {
    const bucketName = 'gb-locacoes-images';

    // Políticas SQL para permitir operações no bucket
    const policies = [
      // Política para permitir INSERT (upload)
      `
      CREATE POLICY "Allow public uploads" ON storage.objects 
      FOR INSERT WITH CHECK (bucket_id = '${bucketName}');
      `,
      // Política para permitir SELECT (visualização)
      `
      CREATE POLICY "Allow public access" ON storage.objects 
      FOR SELECT USING (bucket_id = '${bucketName}');
      `,
      // Política para permitir UPDATE
      `
      CREATE POLICY "Allow public updates" ON storage.objects 
      FOR UPDATE USING (bucket_id = '${bucketName}');
      `,
      // Política para permitir DELETE
      `
      CREATE POLICY "Allow public deletes" ON storage.objects 
      FOR DELETE USING (bucket_id = '${bucketName}');
      `,
    ];

    const results = [];

    for (const policy of policies) {
      try {
        const { error } = await supabaseAdmin.rpc('exec_sql', {
          sql_query: policy,
        });

        if (error && !error.message.includes('already exists')) {
          console.error('Erro ao criar política:', error);
          results.push({ success: false, error: error.message, policy });
        } else {
          results.push({ success: true, policy });
        }
      } catch (err) {
        results.push({ success: false, error: String(err), policy });
      }
    }

    return { success: true, results };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * Método alternativo: Desabilitar RLS completamente para o bucket
 */
export async function disableRLSForStorage() {
  try {
    const { error } = await supabaseAdmin.rpc('exec_sql', {
      sql_query: 'ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;',
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, message: 'RLS desabilitado para storage.objects' };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * Método mais direto: Usar política simples via SQL direto
 */
export async function createSimpleStoragePolicy() {
  try {
    const bucketName = 'gb-locacoes-images';

    // SQL para criar política simples que permite tudo
    const sql = `
      DO $$
      BEGIN
        -- Remover políticas existentes se houver
        DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;
        
        -- Criar política que permite todas as operações
        CREATE POLICY "Allow all operations" ON storage.objects 
        FOR ALL USING (bucket_id = '${bucketName}');
        
      EXCEPTION WHEN OTHERS THEN
        -- Se houve algum erro, apenas continue
        NULL;
      END $$;
    `;

    const { error } = await supabaseAdmin.rpc('exec_sql', {
      sql_query: sql,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: 'Política simples criada para permitir todas as operações no bucket',
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
