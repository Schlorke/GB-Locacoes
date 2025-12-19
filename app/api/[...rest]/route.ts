/**
 * @fileoverview Catch-all route para rotas de API não encontradas
 *
 * Este arquivo captura todas as rotas /api/* que não existem
 * e retorna uma resposta JSON 404 em vez da página HTML padrão do Next.js
 */

import { NextRequest } from 'next/server'
import { notFoundResponse } from '@/lib/api-response'

/**
 * Handler para rotas de API não encontradas
 * Retorna JSON 404 em vez de HTML
 */
export async function GET(_request: NextRequest) {
  return notFoundResponse('Endpoint não encontrado')
}

export async function POST(_request: NextRequest) {
  return notFoundResponse('Endpoint não encontrado')
}

export async function PUT(_request: NextRequest) {
  return notFoundResponse('Endpoint não encontrado')
}

export async function PATCH(_request: NextRequest) {
  return notFoundResponse('Endpoint não encontrado')
}

export async function DELETE(_request: NextRequest) {
  return notFoundResponse('Endpoint não encontrado')
}
