import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rentalsSelectObjectSchema } from './rentalsSelect.schema'
import { rentalsIncludeObjectSchema } from './rentalsInclude.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      select: z.lazy(() => rentalsSelectObjectSchema).optional(),
      include: z.lazy(() => rentalsIncludeObjectSchema).optional(),
    })
    .strict()
export const rentalsArgsObjectSchema = makeSchema()
export const rentalsArgsObjectZodSchema = makeSchema()
