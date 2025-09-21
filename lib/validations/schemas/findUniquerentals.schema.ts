import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema'
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema'
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema'

export const rentalsFindUniqueSchema: z.ZodType<Prisma.rentalsFindUniqueArgs> =
  z
    .object({
      select: rentalsSelectObjectSchema.optional(),
      include: rentalsIncludeObjectSchema.optional(),
      where: rentalsWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.rentalsFindUniqueArgs>

export const rentalsFindUniqueZodSchema = z
  .object({
    select: rentalsSelectObjectSchema.optional(),
    include: rentalsIncludeObjectSchema.optional(),
    where: rentalsWhereUniqueInputObjectSchema,
  })
  .strict()
