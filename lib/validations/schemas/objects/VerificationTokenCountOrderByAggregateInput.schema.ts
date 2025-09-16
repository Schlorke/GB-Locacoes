import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  identifier: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional()
}).strict();
export const VerificationTokenCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput>;
export const VerificationTokenCountOrderByAggregateInputObjectZodSchema = makeSchema();
