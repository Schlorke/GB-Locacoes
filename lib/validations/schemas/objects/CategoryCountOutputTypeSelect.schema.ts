import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      equipments: z.boolean().optional(),
    })
    .strict()
export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryCountOutputTypeSelect>
export const CategoryCountOutputTypeSelectObjectZodSchema = makeSchema()
