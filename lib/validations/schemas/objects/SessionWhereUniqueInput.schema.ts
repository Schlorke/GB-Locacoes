import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SessionWhereUniqueInputObjectSchema: z.ZodType<Prisma.SessionWhereUniqueInput, Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string(),
  sessionToken: z.string()
}).strict();
export const SessionWhereUniqueInputObjectZodSchema = z.object({
  id: z.string(),
  sessionToken: z.string()
}).strict();
