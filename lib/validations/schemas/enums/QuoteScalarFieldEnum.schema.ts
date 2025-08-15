import { z } from 'zod'

export const QuoteScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'phone',
  'company',
  'message',
  'total',
  'status',
  'userId',
  'createdAt',
  'updatedAt',
])
