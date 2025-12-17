import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  distance: SortOrderSchema.optional()
}).strict();
export const DeliverySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DeliverySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliverySumOrderByAggregateInput>;
export const DeliverySumOrderByAggregateInputObjectZodSchema = makeSchema();
