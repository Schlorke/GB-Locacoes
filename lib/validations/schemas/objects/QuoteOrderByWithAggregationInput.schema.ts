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
