import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  expires_at: z.literal(true).optional()
}).strict();
export const AccountSumAggregateInputObjectSchema: z.ZodType<Prisma.AccountSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AccountSumAggregateInputType>;
export const AccountSumAggregateInputObjectZodSchema = makeSchema();
