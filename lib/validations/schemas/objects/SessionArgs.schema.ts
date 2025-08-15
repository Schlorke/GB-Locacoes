import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SessionSelectObjectSchema } from './SessionSelect.schema'
import { SessionIncludeObjectSchema } from './SessionInclude.schema'

export const SessionArgsObjectSchema = z
  .object({
    select: z.lazy(() => SessionSelectObjectSchema).optional(),
    include: z.lazy(() => SessionIncludeObjectSchema).optional(),
  })
  .strict()
export const SessionArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => SessionSelectObjectSchema).optional(),
    include: z.lazy(() => SessionIncludeObjectSchema).optional(),
  })
  .strict()
