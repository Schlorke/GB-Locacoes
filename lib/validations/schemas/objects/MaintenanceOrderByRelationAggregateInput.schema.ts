import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const MaintenanceOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceOrderByRelationAggregateInput>;
export const MaintenanceOrderByRelationAggregateInputObjectZodSchema = makeSchema();
