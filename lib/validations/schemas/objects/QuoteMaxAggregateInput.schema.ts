/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  company: z.literal(true).optional(),
  message: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  cep: z.literal(true).optional(),
  cnpj: z.literal(true).optional(),
  cpf: z.literal(true).optional(),
  adminNotes: z.literal(true).optional(),
  approvedAt: z.literal(true).optional(),
  approvedBy: z.literal(true).optional(),
  convertedToRentalId: z.literal(true).optional(),
  deliveryFee: z.literal(true).optional(),
  deliveryType: z.literal(true).optional(),
  deposit: z.literal(true).optional(),
  discount: z.literal(true).optional(),
  endDate: z.literal(true).optional(),
  finalTotal: z.literal(true).optional(),
  internalNotes: z.literal(true).optional(),
  pickupFee: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  rejectedAt: z.literal(true).optional(),
  rejectedBy: z.literal(true).optional(),
  rejectionReason: z.literal(true).optional(),
  startDate: z.literal(true).optional(),
  subtotal: z.literal(true).optional(),
  taxes: z.literal(true).optional(),
  validUntil: z.literal(true).optional()
}).strict();
export const QuoteMaxAggregateInputObjectSchema: z.ZodType<Prisma.QuoteMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteMaxAggregateInputType>;
export const QuoteMaxAggregateInputObjectZodSchema = makeSchema();
