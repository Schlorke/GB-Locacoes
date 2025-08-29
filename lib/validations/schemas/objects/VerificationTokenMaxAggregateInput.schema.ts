import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  identifier: z.literal(true).optional(),
  token: z.literal(true).optional(),
  expires: z.literal(true).optional()
}).strict();
export const VerificationTokenMaxAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenMaxAggregateInputType>;
export const VerificationTokenMaxAggregateInputObjectZodSchema = makeSchema();
