/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { QuoteCountOrderByAggregateInputObjectSchema as QuoteCountOrderByAggregateInputObjectSchema } from './QuoteCountOrderByAggregateInput.schema';
import { QuoteAvgOrderByAggregateInputObjectSchema as QuoteAvgOrderByAggregateInputObjectSchema } from './QuoteAvgOrderByAggregateInput.schema';
import { QuoteMaxOrderByAggregateInputObjectSchema as QuoteMaxOrderByAggregateInputObjectSchema } from './QuoteMaxOrderByAggregateInput.schema';
import { QuoteMinOrderByAggregateInputObjectSchema as QuoteMinOrderByAggregateInputObjectSchema } from './QuoteMinOrderByAggregateInput.schema';
import { QuoteSumOrderByAggregateInputObjectSchema as QuoteSumOrderByAggregateInputObjectSchema } from './QuoteSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  cpf: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cnpj: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cep: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  company: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  message: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  validUntil: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deliveryType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deliveryAddress: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deliveryFee: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pickupFee: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deposit: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subtotal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  taxes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  discount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  finalTotal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  priority: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  internalNotes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  adminNotes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rejectionReason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  approvedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  approvedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rejectedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rejectedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  convertedToRentalId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => QuoteCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => QuoteAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => QuoteMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => QuoteMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => QuoteSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const QuoteOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.QuoteOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteOrderByWithAggregationInput>;
export const QuoteOrderByWithAggregationInputObjectZodSchema = makeSchema();
