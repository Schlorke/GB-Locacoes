/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  cpf: SortOrderSchema.optional(),
  cnpj: SortOrderSchema.optional(),
  cep: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  message: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  endDate: SortOrderSchema.optional(),
  validUntil: SortOrderSchema.optional(),
  deliveryType: SortOrderSchema.optional(),
  deliveryAddress: SortOrderSchema.optional(),
  deliveryFee: SortOrderSchema.optional(),
  pickupFee: SortOrderSchema.optional(),
  deposit: SortOrderSchema.optional(),
  subtotal: SortOrderSchema.optional(),
  taxes: SortOrderSchema.optional(),
  discount: SortOrderSchema.optional(),
  finalTotal: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  internalNotes: SortOrderSchema.optional(),
  adminNotes: SortOrderSchema.optional(),
  rejectionReason: SortOrderSchema.optional(),
  approvedAt: SortOrderSchema.optional(),
  approvedBy: SortOrderSchema.optional(),
  rejectedAt: SortOrderSchema.optional(),
  rejectedBy: SortOrderSchema.optional(),
  convertedToRentalId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const QuoteCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOrderByAggregateInput>;
export const QuoteCountOrderByAggregateInputObjectZodSchema = makeSchema();
