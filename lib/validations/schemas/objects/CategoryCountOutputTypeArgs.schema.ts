import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { CategoryCountOutputTypeSelectObjectSchema } from './CategoryCountOutputTypeSelect.schema'

export const CategoryCountOutputTypeArgsObjectSchema = z
  .object({
    select: z.lazy(() => CategoryCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()
export const CategoryCountOutputTypeArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => CategoryCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()
