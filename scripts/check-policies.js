#!/usr/bin/env node

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkPolicies() {
  try {
    console.log('🔍 Verificando políticas RLS...\n')

    const policies = await prisma.$queryRaw`
      SELECT 
        tablename,
        policyname,
        qual
      FROM pg_policies 
      WHERE schemaname = 'public'
        AND tablename IN ('users', 'addresses', 'carts')
      ORDER BY tablename, policyname
    `

    console.log(`Encontradas ${policies.length} políticas:\n`)

    policies.forEach((policy) => {
      console.log(`📋 ${policy.tablename}.${policy.policyname}`)
      console.log(`   Qual: ${policy.qual}`)

      // Verificar se está otimizada
      if (policy.qual && policy.qual.includes('(SELECT auth.uid()::text)')) {
        console.log('   ✅ OTIMIZADA')
      } else if (
        policy.qual &&
        policy.qual.includes('( SELECT (auth.uid())::text AS uid)')
      ) {
        console.log('   ❌ NÃO OTIMIZADA')
      } else if (policy.qual === null) {
        console.log('   ⚠️  SEM QUAL (INSERT/UPDATE)')
      } else {
        console.log('   ❓ DESCONHECIDA')
      }
      console.log('')
    })
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkPolicies()
