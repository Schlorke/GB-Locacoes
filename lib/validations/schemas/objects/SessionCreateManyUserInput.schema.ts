import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SessionCreateManyUserInputObjectSchema: z.ZodType<Prisma.SessionCreateManyUserInput, Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();
export const SessionCreateManyUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();
