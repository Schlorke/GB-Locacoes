/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const DeliveryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.DeliveryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryOrderByRelationAggregateInput>;
export const DeliveryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
