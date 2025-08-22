import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const VerificationTokenCreateManyInputObjectSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput, Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}).strict();
export const VerificationTokenCreateManyInputObjectZodSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}).strict();
