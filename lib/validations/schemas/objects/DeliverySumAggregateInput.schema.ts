import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  distance: z.literal(true).optional()
}).strict();
export const DeliverySumAggregateInputObjectSchema: z.ZodType<Prisma.DeliverySumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DeliverySumAggregateInputType>;
export const DeliverySumAggregateInputObjectZodSchema = makeSchema();
