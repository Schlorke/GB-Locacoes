/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  hourMeter: SortOrderSchema.optional(),
  odometer: SortOrderSchema.optional()
}).strict();
export const EquipmentUnitSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentUnitSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitSumOrderByAggregateInput>;
export const EquipmentUnitSumOrderByAggregateInputObjectZodSchema = makeSchema();
