import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { Rental_itemsListRelationFilterObjectSchema } from './Rental_itemsListRelationFilter.schema'
import { UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const rentalsWhereInputObjectSchema: z.ZodType<
  Prisma.rentalsWhereInput,
  Prisma.rentalsWhereInput
> = z
  .object({
    AND: z
      .union([
        z.lazy(() => rentalsWhereInputObjectSchema),
        z.lazy(() => rentalsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => rentalsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => rentalsWhereInputObjectSchema),
        z.lazy(() => rentalsWhereInputObjectSchema).array(),
      ])
      .optional(),
    startdate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    enddate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
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
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    updatedat: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    rental_items: z
      .lazy(() => Rental_itemsListRelationFilterObjectSchema)
      .optional(),
    users: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict()
export const rentalsWhereInputObjectZodSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => rentalsWhereInputObjectSchema),
        z.lazy(() => rentalsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => rentalsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => rentalsWhereInputObjectSchema),
        z.lazy(() => rentalsWhereInputObjectSchema).array(),
      ])
      .optional(),
    startdate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    enddate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
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
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    updatedat: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    rental_items: z
      .lazy(() => Rental_itemsListRelationFilterObjectSchema)
      .optional(),
    users: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict()
