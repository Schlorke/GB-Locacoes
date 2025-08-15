import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SessionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput, Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();
export const SessionUncheckedCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();
