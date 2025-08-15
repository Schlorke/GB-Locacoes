import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

export const rental_itemsScalarWhereInputObjectSchema: z.ZodType<
  Prisma.rental_itemsScalarWhereInput,
  Prisma.rental_itemsScalarWhereInput
> = z
  .object({
    AND: z
      .union([
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => rental_itemsScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    rentalid: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    equipmentid: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    priceperday: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    totaldays: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    totalprice: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    createdat: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    updatedat: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
  })
  .strict()
export const rental_itemsScalarWhereInputObjectZodSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => rental_itemsScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
        z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    rentalid: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    equipmentid: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    priceperday: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    totaldays: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    totalprice: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    createdat: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    updatedat: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
  })
  .strict()
