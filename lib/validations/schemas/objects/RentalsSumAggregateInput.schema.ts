import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  total: z.literal(true).optional()
}).strict();
export const RentalsSumAggregateInputObjectSchema: z.ZodType<Prisma.RentalsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RentalsSumAggregateInputType>;
export const RentalsSumAggregateInputObjectZodSchema = makeSchema();
