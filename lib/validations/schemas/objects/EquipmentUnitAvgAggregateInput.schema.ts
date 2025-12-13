/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  hourMeter: z.literal(true).optional(),
  odometer: z.literal(true).optional()
}).strict();
export const EquipmentUnitAvgAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentUnitAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitAvgAggregateInputType>;
export const EquipmentUnitAvgAggregateInputObjectZodSchema = makeSchema();
