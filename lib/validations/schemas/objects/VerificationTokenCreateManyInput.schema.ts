import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();
export const VerificationTokenCreateManyInputObjectSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenCreateManyInput>;
export const VerificationTokenCreateManyInputObjectZodSchema = makeSchema();
