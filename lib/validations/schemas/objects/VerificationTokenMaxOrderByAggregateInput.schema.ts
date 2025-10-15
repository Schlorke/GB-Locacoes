/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  identifier: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional()
}).strict();
export const VerificationTokenMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput>;
export const VerificationTokenMaxOrderByAggregateInputObjectZodSchema = makeSchema();
