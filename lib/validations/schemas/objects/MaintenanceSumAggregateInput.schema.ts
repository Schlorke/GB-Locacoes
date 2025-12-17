import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  cost: z.literal(true).optional(),
  laborCost: z.literal(true).optional(),
  partsCost: z.literal(true).optional()
}).strict();
export const MaintenanceSumAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceSumAggregateInputType>;
export const MaintenanceSumAggregateInputObjectZodSchema = makeSchema();
