import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const rentalsscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => rentalsScalarWhereInputObjectSchema),
        z.lazy(() => rentalsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => rentalsScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => rentalsScalarWhereInputObjectSchema),
        z.lazy(() => rentalsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    startdate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    enddate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    total: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    status: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    userid: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdat: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    updatedat: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
  })
  .strict()
export const rentalsScalarWhereInputObjectSchema: z.ZodType<Prisma.rentalsScalarWhereInput> =
  rentalsscalarwhereinputSchema as unknown as z.ZodType<Prisma.rentalsScalarWhereInput>
export const rentalsScalarWhereInputObjectZodSchema =
  rentalsscalarwhereinputSchema
