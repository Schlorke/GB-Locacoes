import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
}).strict();
export const VerificationTokenUncheckedCreateInputObjectSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenUncheckedCreateInput>;
export const VerificationTokenUncheckedCreateInputObjectZodSchema = makeSchema();
