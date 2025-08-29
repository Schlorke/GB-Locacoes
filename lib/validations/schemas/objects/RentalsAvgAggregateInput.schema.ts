import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  total: z.literal(true).optional()
}).strict();
export const RentalsAvgAggregateInputObjectSchema: z.ZodType<Prisma.RentalsAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RentalsAvgAggregateInputType>;
export const RentalsAvgAggregateInputObjectZodSchema = makeSchema();
