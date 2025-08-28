import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      OR: z.lazy(makeSchema).array().optional(),
      NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
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
        .nullish(),
      updatedat: z
        .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
        .nullish(),
    })
    .strict()
export const rental_itemsScalarWhereInputObjectSchema: z.ZodType<Prisma.rental_itemsScalarWhereInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsScalarWhereInput>
export const rental_itemsScalarWhereInputObjectZodSchema = makeSchema()
