import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ContractCountOrderByAggregateInputObjectSchema as ContractCountOrderByAggregateInputObjectSchema } from './ContractCountOrderByAggregateInput.schema';
import { ContractMaxOrderByAggregateInputObjectSchema as ContractMaxOrderByAggregateInputObjectSchema } from './ContractMaxOrderByAggregateInput.schema';
import { ContractMinOrderByAggregateInputObjectSchema as ContractMinOrderByAggregateInputObjectSchema } from './ContractMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: SortOrderSchema.optional(),
  template: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  content: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pdfUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  zapSignId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ContractCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ContractMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ContractMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ContractOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ContractOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractOrderByWithAggregationInput>;
export const ContractOrderByWithAggregationInputObjectZodSchema = makeSchema();
