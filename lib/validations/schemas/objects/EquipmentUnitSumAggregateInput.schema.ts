import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  hourMeter: z.literal(true).optional(),
  odometer: z.literal(true).optional()
}).strict();
export const EquipmentUnitSumAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentUnitSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitSumAggregateInputType>;
export const EquipmentUnitSumAggregateInputObjectZodSchema = makeSchema();
