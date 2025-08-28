import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}).strict();
export const VerificationTokenCreateInputObjectSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenCreateInput>;
export const VerificationTokenCreateInputObjectZodSchema = makeSchema();
