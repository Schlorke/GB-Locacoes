/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  year: z.literal(true).optional()
}).strict();
export const VehicleSumAggregateInputObjectSchema: z.ZodType<Prisma.VehicleSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VehicleSumAggregateInputType>;
export const VehicleSumAggregateInputObjectZodSchema = makeSchema();
