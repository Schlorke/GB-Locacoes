import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionSelectObjectSchema } from './SessionSelect.schema';
import { SessionIncludeObjectSchema } from './SessionInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => SessionSelectObjectSchema).optional(),
  include: z.lazy(() => SessionIncludeObjectSchema).optional()
}).strict();
export const SessionArgsObjectSchema = makeSchema();
export const SessionArgsObjectZodSchema = makeSchema();
