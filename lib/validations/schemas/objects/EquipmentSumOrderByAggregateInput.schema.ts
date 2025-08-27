import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  pricePerDay: SortOrderSchema.optional()
}).strict();
export const EquipmentSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentSumOrderByAggregateInput>;
export const EquipmentSumOrderByAggregateInputObjectZodSchema = makeSchema();
