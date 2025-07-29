/**
 * Script para testar a configuração do Supabase Storage
 * Execute: node test-supabase.js
 */

import fetch from 'node-fetch';

async function testSupabaseSetup() {
  const baseUrl = 'http://localhost:3000';

  console.log('🧪 Testando configuração do Supabase Storage...\n');

  try {
    // Teste 1: Setup do bucket
    console.log('📦 1. Configurando bucket...');
    const setupResponse = await fetch(`${baseUrl}/api/supabase-setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'setup' }),
    });

    const setupResult = await setupResponse.json();
    console.log('✅ Setup:', setupResult.success ? 'OK' : 'ERRO');
    if (!setupResult.success) {
      console.log('❌ Erro:', setupResult.error);
    }

    // Teste 2: Teste de upload
    console.log('\n📤 2. Testando upload...');
    const testResponse = await fetch(`${baseUrl}/api/supabase-setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test' }),
    });

    const testResult = await testResponse.json();
    console.log('✅ Upload:', testResult.success ? 'OK' : 'ERRO');
    if (!testResult.success) {
      console.log('❌ Erro:', testResult.error);
    } else {
      console.log('🔗 URL de teste:', testResult.testUrl);
    }

    console.log('\n🎉 Teste concluído!');

    if (setupResult.success && testResult.success) {
      console.log('✅ Sistema de upload configurado e funcionando!');
    } else {
      console.log('❌ Problemas encontrados. Verifique a configuração.');
    }
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.log('\n💡 Certifique-se de que:');
    console.log('   - O servidor está rodando (pnpm dev)');
    console.log('   - As variáveis SUPABASE estão configuradas');
    console.log('   - Você tem acesso ao projeto Supabase');
  }
}

testSupabaseSetup();
