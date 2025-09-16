import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { VerificationTokenCountOrderByAggregateInputObjectSchema } from './VerificationTokenCountOrderByAggregateInput.schema';
import { VerificationTokenMaxOrderByAggregateInputObjectSchema } from './VerificationTokenMaxOrderByAggregateInput.schema';
import { VerificationTokenMinOrderByAggregateInputObjectSchema } from './VerificationTokenMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  identifier: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const VerificationTokenOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput>;
export const VerificationTokenOrderByWithAggregationInputObjectZodSchema = makeSchema();
