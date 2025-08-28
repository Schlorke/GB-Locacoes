/**
 * @fileoverview Testes de validação usando schemas Zod
 *
 * Estes testes garantem que nossos schemas Zod estão funcionando
 * corretamente e validando os dados conforme esperado.
 */

import {
  CategoryPublicSchema,
  ContactSchema,
  EquipmentPublicSchema,
  ErrorSchema,
  QuoteRequestSchema,
} from '@/lib/validations'
import { describe, expect, test } from 'vitest'

describe('🔍 Zod Schema Validation', () => {
  describe('📱 Equipment Schema', () => {
    test('should validate valid equipment data', () => {
      const validEquipment = {
        id: 'cme0n8pld0003kytghr9tcl5n',
        name: 'Escavadeira Hidráulica CAT 320',
        description: 'Escavadeira para obras pesadas',
        pricePerDay: 450.0,
        imageUrl: 'https://storage.googleapis.com/equipments/cat-320.jpg',
        images: ['https://storage.googleapis.com/equipments/cat-320.jpg'],
        isAvailable: true,
        category: {
          id: 'cat_excavators',
          name: 'Escavadeiras',
          icon: 'Construction',
          iconColor: '#ea580c',
          bgColor: 'from-orange-500 to-orange-600',
          fontColor: 'text-white',
        },
        reviews: [],
      }

      const result = EquipmentPublicSchema.safeParse(validEquipment)
      expect(result.success).toBe(true)
    })

    test('should reject invalid equipment data', () => {
      const invalidEquipment = {
        // Missing required fields
        name: 'Test Equipment',
      }

      const result = EquipmentPublicSchema.safeParse(invalidEquipment)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })

    test('should handle nullable fields correctly', () => {
      const equipmentWithNulls = {
        id: 'test-id',
        name: 'Test Equipment',
        description: null, // nullable field
        pricePerDay: 100.0,
        imageUrl: null, // nullable field
        images: [],
        isAvailable: true,
        category: {
          id: 'test-cat',
          name: 'Test Category',
          icon: null, // nullable field
          iconColor: '#000000',
          bgColor: 'bg-gray-500',
          fontColor: 'text-white',
        },
        reviews: [],
      }

      const result = EquipmentPublicSchema.safeParse(equipmentWithNulls)
      expect(result.success).toBe(true)
    })
  })

  describe('📂 Category Schema', () => {
    test('should validate valid category data', () => {
      const validCategory = {
        id: 'cat_excavators',
        name: 'Escavadeiras',
        description: 'Equipamentos de escavação',
        icon: 'Construction',
        iconColor: '#ea580c',
        bgColor: 'from-orange-500 to-orange-600',
        fontColor: 'text-white',
        slug: 'escavadeiras',
        _count: {
          equipments: 5,
        },
      }

      const result = CategoryPublicSchema.safeParse(validCategory)
      expect(result.success).toBe(true)
    })

    test('should reject invalid category data', () => {
      const invalidCategory = {
        id: 'test',
        // Missing required fields
      }

      const result = CategoryPublicSchema.safeParse(invalidCategory)
      expect(result.success).toBe(false)
    })
  })

  describe('💰 Quote Request Schema', () => {
    test('should validate valid quote request', () => {
      const validQuoteRequest = {
        customerName: 'João Silva',
        customerPhone: '(51) 99999-9999',
        customerEmail: 'joao@empresa.com.br',
        customerCompany: 'Construtora ABC',
        message: 'Preciso para obra de 15 dias',
        items: [
          {
            equipmentId: 'cme0n8pld0003kytghr9tcl5n',
            quantity: 2,
            days: 10,
          },
        ],
      }

      const result = QuoteRequestSchema.safeParse(validQuoteRequest)
      expect(result.success).toBe(true)
    })

    test('should reject quote request with invalid email', () => {
      const invalidQuoteRequest = {
        customerName: 'João Silva',
        customerPhone: '(51) 99999-9999',
        customerEmail: 'invalid-email', // Invalid email format
        items: [
          {
            equipmentId: 'cme0n8pld0003kytghr9tcl5n',
            quantity: 1,
            days: 1,
          },
        ],
      }

      const result = QuoteRequestSchema.safeParse(invalidQuoteRequest)
      expect(result.success).toBe(false)

      if (!result.success) {
        const emailError = result.error.issues.find((issue: any) =>
          issue.path.includes('customerEmail')
        )
        expect(emailError).toBeDefined()
        expect(emailError?.message).toContain('Email inválido')
      }
    })

    test('should reject quote request with empty items array', () => {
      const invalidQuoteRequest = {
        customerName: 'João Silva',
        customerPhone: '(51) 99999-9999',
        customerEmail: 'joao@empresa.com.br',
        items: [], // Empty array should fail
      }

      const result = QuoteRequestSchema.safeParse(invalidQuoteRequest)
      expect(result.success).toBe(false)

      if (!result.success) {
        const itemsError = result.error.issues.find((issue: any) =>
          issue.path.includes('items')
        )
        expect(itemsError).toBeDefined()
      }
    })

    test('should allow optional fields to be undefined', () => {
      const minimalQuoteRequest = {
        customerName: 'João Silva',
        customerPhone: '(51) 99999-9999',
        customerEmail: 'joao@empresa.com.br',
        items: [
          {
            equipmentId: 'cme0n8pld0003kytghr9tcl5n',
            quantity: 1,
            days: 1,
          },
        ],
        // customerCompany and message are optional
      }

      const result = QuoteRequestSchema.safeParse(minimalQuoteRequest)
      expect(result.success).toBe(true)
    })
  })

  describe('📧 Contact Schema', () => {
    test('should validate valid contact data', () => {
      const validContact = {
        name: 'Maria Silva',
        phone: '(51) 99999-9999',
        email: 'maria@empresa.com.br',
        company: 'Construtora XYZ',
        equipments: 'Escavadeiras e Compressores',
        message: 'Gostaria de mais informações sobre locação',
      }

      const result = ContactSchema.safeParse(validContact)
      expect(result.success).toBe(true)
    })

    test('should reject contact with empty required fields', () => {
      const invalidContact = {
        name: '',
        phone: '',
        email: 'valid@email.com',
        message: '', // Required field empty
      }

      const result = ContactSchema.safeParse(invalidContact)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })

  describe('❌ Error Schema', () => {
    test('should validate standard error format', () => {
      const validError = {
        error: 'Something went wrong',
        code: '500',
        details: { additional: 'info' },
      }

      const result = ErrorSchema.safeParse(validError)
      expect(result.success).toBe(true)
    })

    test('should validate minimal error format', () => {
      const minimalError = {
        error: 'Error message',
      }

      const result = ErrorSchema.safeParse(minimalError)
      expect(result.success).toBe(true)
    })

    test('should reject error without message', () => {
      const invalidError = {
        code: '500',
        // Missing required 'error' field
      }

      const result = ErrorSchema.safeParse(invalidError)
      expect(result.success).toBe(false)
    })
  })

  describe('🔄 Schema Integration Tests', () => {
    test('should parse and validate real API response structure', () => {
      // Simula uma resposta real da API de equipamentos
      const apiResponse = [
        {
          id: 'cme0n8pld0003kytghr9tcl5n',
          name: 'Escavadeira Hidráulica CAT 320',
          description: 'Escavadeira hidráulica para obras pesadas',
          pricePerDay: 450.0,
          imageUrl: 'https://storage.googleapis.com/equipments/cat-320.jpg',
          images: ['https://storage.googleapis.com/equipments/cat-320.jpg'],
          isAvailable: true,
          category: {
            id: 'cat_excavators',
            name: 'Escavadeiras',
            icon: 'Construction',
            iconColor: '#ea580c',
            bgColor: 'from-orange-500 to-orange-600',
            fontColor: 'text-white',
          },
          reviews: [],
        },
      ]

      // Validar cada item do array
      for (const equipment of apiResponse) {
        const result = EquipmentPublicSchema.safeParse(equipment)
        expect(result.success).toBe(true)
      }
    })

    test('should provide detailed error messages for debugging', () => {
      const invalidData = {
        id: 123, // Should be string
        name: '', // Should not be empty
        pricePerDay: -100, // Should be >= 0
        isAvailable: 'yes', // Should be boolean
        // Missing required fields - will cause validation errors
      }

      const result = EquipmentPublicSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        // Verificar se temos mensagens de erro úteis
        expect(result.error.issues.length).toBeGreaterThan(0)

        // Verificar tipos específicos de erro esperados
        const issues = result.error.issues
        const idError = issues.find((issue) => issue.path.includes('id'))
        const priceError = issues.find((issue) =>
          issue.path.includes('pricePerDay')
        )
        const availableError = issues.find((issue) =>
          issue.path.includes('isAvailable')
        )

        expect(idError).toBeDefined()
        expect(priceError).toBeDefined()
        expect(availableError).toBeDefined()

        // Log dos erros para debugging (apenas em ambiente de teste)
        if (process.env.NODE_ENV === 'test') {
          console.log('Schema validation errors:', result.error.issues)
        }
      }
    })
  })
})
