import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  pricePerDay: SortOrderSchema.optional()
}).strict();
export const EquipmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput>;
export const EquipmentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
