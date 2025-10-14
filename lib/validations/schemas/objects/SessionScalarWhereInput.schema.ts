/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const sessionscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereInputObjectSchema),
        z.lazy(() => SessionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereInputObjectSchema),
        z.lazy(() => SessionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    sessionToken: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()
export const SessionScalarWhereInputObjectSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  sessionscalarwhereinputSchema as unknown as z.ZodType<Prisma.SessionScalarWhereInput>
export const SessionScalarWhereInputObjectZodSchema =
  sessionscalarwhereinputSchema
