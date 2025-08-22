import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const VerificationTokenUncheckedCreateInputObjectSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput, Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}).strict();
export const VerificationTokenUncheckedCreateInputObjectZodSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}).strict();
