import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  cost: z.literal(true).optional(),
  laborCost: z.literal(true).optional(),
  partsCost: z.literal(true).optional()
}).strict();
export const MaintenanceAvgAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceAvgAggregateInputType>;
export const MaintenanceAvgAggregateInputObjectZodSchema = makeSchema();
