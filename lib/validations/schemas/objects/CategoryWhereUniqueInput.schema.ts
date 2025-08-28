import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
      slug: z.string(),
    })
    .strict()
export const CategoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryWhereUniqueInput>
export const CategoryWhereUniqueInputObjectZodSchema = makeSchema()
