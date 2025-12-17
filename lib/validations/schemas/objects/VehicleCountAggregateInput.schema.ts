import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  plate: z.literal(true).optional(),
  brand: z.literal(true).optional(),
  model: z.literal(true).optional(),
  year: z.literal(true).optional(),
  type: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const VehicleCountAggregateInputObjectSchema: z.ZodType<Prisma.VehicleCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VehicleCountAggregateInputType>;
export const VehicleCountAggregateInputObjectZodSchema = makeSchema();
