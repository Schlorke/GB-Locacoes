import { supabaseAdmin } from '@/lib/supabase-admin';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'reset') {
      // Primeiro, tentar remover o bucket existente
      try {
        await supabaseAdmin.storage.deleteBucket('gb-locacoes-images');
        // Bucket antigo removido
      } catch (_error) {
        // Bucket não existia ou não pôde ser removido
      }

      // Criar novo bucket
      const { data, error } = await supabaseAdmin.storage.createBucket('gb-locacoes-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880, // 5MB
      });

      if (error) {
        return NextResponse.json({ success: false, error: error.message });
      }

      // Configurar políticas RLS
      try {
        const policySQL = `
          -- Remover políticas existentes
          DROP POLICY IF EXISTS "Allow all operations on gb-locacoes-images" ON storage.objects;
          
          -- Criar política que permite todas as operações para este bucket
          CREATE POLICY "Allow all operations on gb-locacoes-images" ON storage.objects 
          FOR ALL USING (bucket_id = 'gb-locacoes-images');
        `;

        await supabaseAdmin.rpc('exec_sql', { sql_query: policySQL });

        return NextResponse.json({
          success: true,
          message: 'Bucket recriado com políticas RLS configuradas',
          data,
        });
      } catch (policyError) {
        return NextResponse.json({
          success: true,
          message: 'Bucket criado, mas políticas RLS não puderam ser configuradas',
          warning: String(policyError),
          data,
        });
      }
    }

    if (action === 'fix-permissions') {
      // Apenas tentar corrigir as permissões
      try {
        const policySQL = `
          -- Verificar se a tabela storage.objects tem RLS habilitado
          SELECT tablename FROM pg_tables WHERE schemaname = 'storage' AND tablename = 'objects';
          
          -- Remover políticas conflitantes
          DROP POLICY IF EXISTS "Allow all operations on gb-locacoes-images" ON storage.objects;
          DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
          DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
          
          -- Criar uma política simples e permissiva
          CREATE POLICY "gb_locacoes_full_access" ON storage.objects 
          FOR ALL 
          USING (bucket_id = 'gb-locacoes-images') 
          WITH CHECK (bucket_id = 'gb-locacoes-images');
        `;

        await supabaseAdmin.rpc('exec_sql', { sql_query: policySQL });

        return NextResponse.json({
          success: true,
          message: 'Políticas RLS corrigidas',
        });
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: 'Não foi possível corrigir as políticas: ' + String(error),
        });
      }
    }

    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno: ' + String(error),
      },
      { status: 500 },
    );
  }
}
