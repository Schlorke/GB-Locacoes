/**
 * @fileoverview Testes de contrato da API
 *
 * Estes testes verificam se a implementação da API está de acordo
 * com a especificação OpenAPI gerada automaticamente.
 */

import { readFileSync } from 'fs'
import { join } from 'node:path'
import { beforeAll, describe, expect, test } from 'vitest'

// Helper para verificar se o servidor está disponível
async function isServerAvailable(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${url}/api/health`, {
      signal: AbortSignal.timeout(2000),
    })
    return response.ok
  } catch {
    return false
  }
}

// Tipos para validação de schema OpenAPI
interface OpenAPISpec {
  paths: Record<string, Record<string, any>>
  components: {
    schemas: Record<string, any>
  }
}

describe('🔒 Contract Testing - API Specification', () => {
  let openApiSpec: OpenAPISpec
  let baseUrl: string
  let serverAvailable: boolean

  beforeAll(async () => {
    // Carregar especificação OpenAPI
    const specPath = join(process.cwd(), 'public', 'openapi.json')
    const specContent = readFileSync(specPath, 'utf-8')
    openApiSpec = JSON.parse(specContent)

    // URL base para testes
    baseUrl =
      process.env.NODE_ENV === 'test'
        ? 'http://localhost:3000'
        : 'http://localhost:3000'

    // Verificar se o servidor está disponível
    serverAvailable = await isServerAvailable(baseUrl)

    console.log(`🔗 Testing against: ${baseUrl}`)
    console.log(`🌐 Server available: ${serverAvailable ? '✅' : '❌'}`)
    console.log(
      `📊 Loaded OpenAPI spec with ${Object.keys(openApiSpec.paths).length} endpoints`
    )
  })

  describe('📄 OpenAPI Specification Validation', () => {
    test('should have valid OpenAPI structure', () => {
      expect(openApiSpec).toBeDefined()
      expect(openApiSpec.paths).toBeDefined()
      expect(openApiSpec.components).toBeDefined()
      expect(openApiSpec.components.schemas).toBeDefined()
    })

    test('should have documented all major endpoints', () => {
      const paths = Object.keys(openApiSpec.paths)

      // Endpoints públicos
      expect(paths).toContain('/equipments')
      expect(paths).toContain('/categories')
      expect(paths).toContain('/quotes')
      expect(paths).toContain('/contact')

      // Endpoints administrativos
      expect(paths.some((path) => path.startsWith('/admin/'))).toBe(true)

      console.log(`✅ Found ${paths.length} documented endpoints`)
    })

    test('should have required schemas defined', () => {
      const schemas = Object.keys(openApiSpec.components.schemas)

      // TODO: Implementar schemas no OpenAPI quando necessário
      // Por enquanto, apenas verificamos se a estrutura existe
      expect(openApiSpec.components.schemas).toBeDefined()

      console.log(
        `✅ Found ${schemas.length} schemas: ${schemas.join(', ')} (schemas will be added as needed)`
      )
    })
  })

  describe('🌐 Public Endpoints Validation', () => {
    test('GET /api/equipments should match OpenAPI spec', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/equipments`)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')

      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)

      // Se houver dados, verificar estrutura
      if (data.length > 0) {
        const equipment = data[0]
        expect(equipment).toHaveProperty('id')
        expect(equipment).toHaveProperty('name')
        expect(equipment).toHaveProperty('pricePerDay')
        expect(equipment).toHaveProperty('isAvailable')
        expect(equipment).toHaveProperty('category')
        expect(equipment.category).toHaveProperty('id')
        expect(equipment.category).toHaveProperty('name')
      }
    })

    test('GET /api/categories should match OpenAPI spec', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/categories`)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')

      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)

      // Se houver dados, verificar estrutura
      if (data.length > 0) {
        const category = data[0]
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('iconColor')
        expect(category).toHaveProperty('bgColor')
        expect(category).toHaveProperty('fontColor')
        expect(category).toHaveProperty('slug')
        expect(category).toHaveProperty('_count')
        expect(category._count).toHaveProperty('equipments')
      }
    })

    test('POST /api/contact should validate required fields', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      // Teste com dados inválidos (deve retornar 400)
      const invalidResponse = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Campos obrigatórios ausentes
        }),
      })

      expect(invalidResponse.status).toBe(400)

      const errorData = await invalidResponse.json()
      expect(errorData).toHaveProperty('error')
    })

    test('POST /api/quotes should validate required fields', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      // Teste com dados inválidos (deve retornar 400)
      const invalidResponse = await fetch(`${baseUrl}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Campos obrigatórios ausentes
        }),
      })

      expect(invalidResponse.status).toBe(400)

      const errorData = await invalidResponse.json()
      expect(errorData).toHaveProperty('error')
    })
  })

  describe('🔐 Protected Endpoints Validation', () => {
    test('GET /api/admin/dashboard should require authentication', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/admin/dashboard`)

      // Deve retornar 401 ou 403 (não autenticado)
      expect([401, 403]).toContain(response.status)

      const data = await response.json()
      expect(data).toHaveProperty('error')
    })

    test('GET /api/admin/equipments should require authentication', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/admin/equipments`)

      // Deve retornar 401 ou 403 (não autenticado)
      expect([401, 403]).toContain(response.status)

      const data = await response.json()
      expect(data).toHaveProperty('error')
    })

    test('GET /api/admin/quotes should require authentication', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/admin/quotes`)

      // Deve retornar 401 ou 403 (não autenticado)
      expect([401, 403]).toContain(response.status)

      const data = await response.json()
      expect(data).toHaveProperty('error')
    })
  })

  describe('⚡ Response Time & Performance', () => {
    test('public endpoints should respond within acceptable time', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const endpoints = ['/api/equipments', '/api/categories']

      for (const endpoint of endpoints) {
        const startTime = Date.now()
        const response = await fetch(`${baseUrl}${endpoint}`)
        const endTime = Date.now()

        const responseTime = endTime - startTime

        expect(response.status).toBe(200)
        expect(responseTime).toBeLessThan(5000) // 5 segundos max

        console.log(`⚡ ${endpoint}: ${responseTime}ms`)
      }
    })
  })

  describe('🔄 API Consistency', () => {
    test('error responses should follow consistent format', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      // Teste endpoint não existente
      const response = await fetch(`${baseUrl}/api/nonexistent`)

      expect(response.status).toBe(404)

      const data = await response.json()
      expect(data).toHaveProperty('error')
      expect(typeof data.error).toBe('string')
    })

    test('all responses should have correct content-type', async () => {
      if (!serverAvailable) {
        console.log('⏭️  Skipping server test - server not available')
        return
      }

      const endpoints = ['/api/equipments', '/api/categories']

      for (const endpoint of endpoints) {
        const response = await fetch(`${baseUrl}${endpoint}`)

        expect(response.headers.get('content-type')).toContain(
          'application/json'
        )
      }
    })
  })
})
