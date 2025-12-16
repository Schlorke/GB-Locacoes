/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { QuoteOrderByWithRelationInputObjectSchema as QuoteOrderByWithRelationInputObjectSchema } from './QuoteOrderByWithRelationInput.schema';
import { rentalsOrderByWithRelationInputObjectSchema as rentalsOrderByWithRelationInputObjectSchema } from './rentalsOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quoteId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  paidAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dueDate: SortOrderSchema.optional(),
  invoiceNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  transactionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pixCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pixQrCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputObjectSchema).optional(),
  rental: z.lazy(() => rentalsOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PaymentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PaymentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentOrderByWithRelationInput>;
export const PaymentOrderByWithRelationInputObjectZodSchema = makeSchema();
