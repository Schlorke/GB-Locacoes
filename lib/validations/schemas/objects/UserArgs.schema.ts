import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { UserSelectObjectSchema } from './UserSelect.schema'
import { UserIncludeObjectSchema } from './UserInclude.schema'

export const UserArgsObjectSchema = z
  .object({
    select: z.lazy(() => UserSelectObjectSchema).optional(),
    include: z.lazy(() => UserIncludeObjectSchema).optional(),
  })
  .strict()
export const UserArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => UserSelectObjectSchema).optional(),
    include: z.lazy(() => UserIncludeObjectSchema).optional(),
  })
  .strict()
