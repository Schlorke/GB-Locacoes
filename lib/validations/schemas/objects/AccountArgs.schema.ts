import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { AccountSelectObjectSchema } from './AccountSelect.schema'
import { AccountIncludeObjectSchema } from './AccountInclude.schema'

export const AccountArgsObjectSchema = z
  .object({
    select: z.lazy(() => AccountSelectObjectSchema).optional(),
    include: z.lazy(() => AccountIncludeObjectSchema).optional(),
  })
  .strict()
export const AccountArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => AccountSelectObjectSchema).optional(),
    include: z.lazy(() => AccountIncludeObjectSchema).optional(),
  })
  .strict()
