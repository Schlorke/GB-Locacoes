/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  distance: SortOrderSchema.optional()
}).strict();
export const DeliveryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DeliveryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryAvgOrderByAggregateInput>;
export const DeliveryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
