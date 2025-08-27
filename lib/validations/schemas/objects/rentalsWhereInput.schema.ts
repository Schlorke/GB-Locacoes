import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { Rental_itemsListRelationFilterObjectSchema } from './Rental_itemsListRelationFilter.schema'
import { UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      OR: z.lazy(makeSchema).array().optional(),
      NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      id: z
        .union([z.lazy(() => StringFilterObjectSchema), z.string()])
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
        .nullish(),
      userid: z
        .union([z.lazy(() => StringFilterObjectSchema), z.string()])
        .optional(),
      createdat: z
        .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
        .nullish(),
      updatedat: z
        .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
        .nullish(),
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
export const rentalsWhereInputObjectSchema: z.ZodType<Prisma.rentalsWhereInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsWhereInput>
export const rentalsWhereInputObjectZodSchema = makeSchema()
