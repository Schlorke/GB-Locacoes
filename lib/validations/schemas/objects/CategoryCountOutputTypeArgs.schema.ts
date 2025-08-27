import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { CategoryCountOutputTypeSelectObjectSchema } from './CategoryCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      select: z
        .lazy(() => CategoryCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict()
export const CategoryCountOutputTypeArgsObjectSchema = makeSchema()
export const CategoryCountOutputTypeArgsObjectZodSchema = makeSchema()
