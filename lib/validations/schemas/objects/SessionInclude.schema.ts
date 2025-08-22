import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

export const SessionIncludeObjectSchema: z.ZodType<Prisma.SessionInclude, Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const SessionIncludeObjectZodSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
