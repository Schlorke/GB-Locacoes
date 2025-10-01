#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testCommit() {
  try {
    console.log('🔄 Testando commit de transação...');
    
    // Tentar alterar uma política com commit explícito
    await prisma.$executeRaw`BEGIN`;
    await prisma.$executeRaw`DROP POLICY IF EXISTS "test_commit_policy" ON public.users`;
    await prisma.$executeRaw`CREATE POLICY "test_commit_policy" ON public.users FOR SELECT TO authenticated USING (false)`;
    await prisma.$executeRaw`COMMIT`;
    
    console.log('✅ Transação commitada com sucesso');
    
    // Verificar se a política foi criada
    const result = await prisma.$queryRaw`
      SELECT policyname FROM pg_policies 
      WHERE schemaname = 'public' AND policyname = 'test_commit_policy'
    `;
    
    if (result.length > 0) {
      console.log('✅ Política criada e persistida');
    } else {
      console.log('❌ Política não foi persistida');
    }
    
    // Limpar
    await prisma.$executeRaw`DROP POLICY IF EXISTS "test_commit_policy" ON public.users`;
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testCommit();
