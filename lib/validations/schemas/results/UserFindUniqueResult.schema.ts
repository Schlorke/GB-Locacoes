/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const UserFindUniqueResultSchema = z.nullable(z.object({
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
  approvedQuotes: z.array(z.unknown()),
  rejectedQuotes: z.array(z.unknown()),
  auditLogs: z.array(z.unknown())
}));