import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<
  Prisma.CategoryCountOutputTypeSelect,
  Prisma.CategoryCountOutputTypeSelect
> = z
  .object({
    equipments: z.boolean().optional(),
  })
  .strict()
export const CategoryCountOutputTypeSelectObjectZodSchema = z
  .object({
    equipments: z.boolean().optional(),
  })
  .strict()
