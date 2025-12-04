#!/usr/bin/env node

import { prisma } from './prisma-client.js'

async function createMissingIndex() {
  try {
    console.log('🔧 Criando índice faltante...')

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "idx_cart_items_cartid" ON public.cart_items ("cartId");
    `)

    console.log('✅ Índice idx_cart_items_cartid criado com sucesso!')
  } catch (error) {
    console.log('❌ Erro:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createMissingIndex()
