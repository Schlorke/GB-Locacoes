import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DecimalFilterObjectSchema } from './DecimalFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { EquipmentScalarRelationFilterObjectSchema } from './EquipmentScalarRelationFilter.schema'
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'
import { RentalsScalarRelationFilterObjectSchema } from './RentalsScalarRelationFilter.schema'
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const rental_itemswhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => rental_itemsWhereInputObjectSchema),
        z.lazy(() => rental_itemsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => rental_itemsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => rental_itemsWhereInputObjectSchema),
        z.lazy(() => rental_itemsWhereInputObjectSchema).array(),
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
    equipments: z
      .union([
        z.lazy(() => EquipmentScalarRelationFilterObjectSchema),
        z.lazy(() => EquipmentWhereInputObjectSchema),
      ])
      .optional(),
    rentals: z
      .union([
        z.lazy(() => RentalsScalarRelationFilterObjectSchema),
        z.lazy(() => rentalsWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict()
export const rental_itemsWhereInputObjectSchema: z.ZodType<Prisma.rental_itemsWhereInput> =
  rental_itemswhereinputSchema as unknown as z.ZodType<Prisma.rental_itemsWhereInput>
export const rental_itemsWhereInputObjectZodSchema =
  rental_itemswhereinputSchema
