import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SessionCreateManyInputObjectSchema: z.ZodType<Prisma.SessionCreateManyInput, Prisma.SessionCreateManyInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date()
}).strict();
export const SessionCreateManyInputObjectZodSchema = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date()
}).strict();
