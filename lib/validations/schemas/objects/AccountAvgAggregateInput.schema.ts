import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  expires_at: z.literal(true).optional()
}).strict();
export const AccountAvgAggregateInputObjectSchema: z.ZodType<Prisma.AccountAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AccountAvgAggregateInputType>;
export const AccountAvgAggregateInputObjectZodSchema = makeSchema();
