import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SessionCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput, Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();
export const SessionCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();
