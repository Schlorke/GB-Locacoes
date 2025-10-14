/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema'
import { rentalsCreateManyInputObjectSchema as rentalsCreateManyInputObjectSchema } from './objects/rentalsCreateManyInput.schema'

export const rentalsCreateManyAndReturnSchema: z.ZodType<Prisma.rentalsCreateManyAndReturnArgs> =
  z
    .object({
      select: rentalsSelectObjectSchema.optional(),
      data: z.union([
        rentalsCreateManyInputObjectSchema,
        z.array(rentalsCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rentalsCreateManyAndReturnArgs>

export const rentalsCreateManyAndReturnZodSchema = z
  .object({
    select: rentalsSelectObjectSchema.optional(),
    data: z.union([
      rentalsCreateManyInputObjectSchema,
      z.array(rentalsCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
