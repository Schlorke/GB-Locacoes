import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { UuidFilterObjectSchema } from './UuidFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema'
import { CategoryScalarRelationFilterObjectSchema } from './CategoryScalarRelationFilter.schema'
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'
import { QuoteItemListRelationFilterObjectSchema } from './QuoteItemListRelationFilter.schema'
import { Rental_itemsListRelationFilterObjectSchema } from './Rental_itemsListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      OR: z.lazy(makeSchema).array().optional(),
      NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
      id: z
        .union([z.lazy(() => StringFilterObjectSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringFilterObjectSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
        .nullish(),
      pricePerDay: z
        .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
        .optional(),
      images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
      available: z
        .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
        .optional(),
      categoryId: z
        .union([z.lazy(() => UuidFilterObjectSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
        .optional(),
      category_id: z
        .union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()])
        .nullish(),
      category: z
        .union([
          z.lazy(() => CategoryScalarRelationFilterObjectSchema),
          z.lazy(() => CategoryWhereInputObjectSchema),
        ])
        .optional(),
      quoteItems: z
        .lazy(() => QuoteItemListRelationFilterObjectSchema)
        .optional(),
      rental_items: z
        .lazy(() => Rental_itemsListRelationFilterObjectSchema)
        .optional(),
    })
    .strict()
export const EquipmentWhereInputObjectSchema: z.ZodType<Prisma.EquipmentWhereInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentWhereInput>
export const EquipmentWhereInputObjectZodSchema = makeSchema()
