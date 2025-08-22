import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

export const AccountIncludeObjectSchema: z.ZodType<Prisma.AccountInclude, Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const AccountIncludeObjectZodSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
