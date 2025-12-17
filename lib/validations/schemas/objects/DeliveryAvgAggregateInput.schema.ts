import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  distance: z.literal(true).optional()
}).strict();
export const DeliveryAvgAggregateInputObjectSchema: z.ZodType<Prisma.DeliveryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryAvgAggregateInputType>;
export const DeliveryAvgAggregateInputObjectZodSchema = makeSchema();
