/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const UserFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      email: z.string(),
      password: z.string().optional(),
      phone: z.string().optional(),
      cpf: z.string().optional(),
      cnpj: z.string().optional(),
      role: z.unknown(),
      emailVerified: z.date().optional(),
      image: z.string().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
      accounts: z.array(z.unknown()),
      quotes: z.array(z.unknown()),
      rentals: z.array(z.unknown()),
      sessions: z.array(z.unknown()),
      addresses: z.array(z.unknown()),
      cart: z.unknown().optional(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
})
