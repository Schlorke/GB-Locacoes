/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { QuoteCountOutputTypeArgsObjectSchema as QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  cpf: z.boolean().optional(),
  cnpj: z.boolean().optional(),
  cep: z.boolean().optional(),
  company: z.boolean().optional(),
  message: z.boolean().optional(),
  total: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  validUntil: z.boolean().optional(),
  deliveryType: z.boolean().optional(),
  deliveryAddress: z.boolean().optional(),
  deliveryFee: z.boolean().optional(),
  pickupFee: z.boolean().optional(),
  deposit: z.boolean().optional(),
  subtotal: z.boolean().optional(),
  taxes: z.boolean().optional(),
  discount: z.boolean().optional(),
  finalTotal: z.boolean().optional(),
  priority: z.boolean().optional(),
  internalNotes: z.boolean().optional(),
  adminNotes: z.boolean().optional(),
  rejectionReason: z.boolean().optional(),
  approvedAt: z.boolean().optional(),
  approvedBy: z.boolean().optional(),
  rejectedAt: z.boolean().optional(),
  rejectedBy: z.boolean().optional(),
  convertedToRentalId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  items: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  approvedByUser: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  rejectedByUser: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const QuoteSelectObjectSchema: z.ZodType<Prisma.QuoteSelect> = makeSchema() as unknown as z.ZodType<Prisma.QuoteSelect>;
export const QuoteSelectObjectZodSchema = makeSchema();
