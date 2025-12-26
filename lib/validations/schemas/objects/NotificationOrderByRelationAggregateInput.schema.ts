/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const NotificationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.NotificationOrderByRelationAggregateInput>;
export const NotificationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
