import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();
export const SessionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedCreateInput>;
export const SessionUncheckedCreateInputObjectZodSchema = makeSchema();
