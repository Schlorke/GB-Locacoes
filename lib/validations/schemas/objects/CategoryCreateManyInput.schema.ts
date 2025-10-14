/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      icon: z.string().optional().nullable(),
      iconColor: z.string().optional(),
      bgColor: z.string().optional(),
      fontColor: z.string().optional(),
      slug: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict()
export const CategoryCreateManyInputObjectSchema: z.ZodType<Prisma.CategoryCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateManyInput>
export const CategoryCreateManyInputObjectZodSchema = makeSchema()
