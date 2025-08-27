import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema'
import { QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput.schema'
import { rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().nullish(),
      pricePerDay: z.number(),
      images: z
        .union([
          z.lazy(() => EquipmentCreateimagesInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      available: z.boolean().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      category_id: z.string().nullish(),
      quoteItems: z
        .lazy(
          () =>
            QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema
        )
        .optional(),
      rental_items: z
        .lazy(
          () =>
            rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const EquipmentUncheckedCreateWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateWithoutCategoryInput>
export const EquipmentUncheckedCreateWithoutCategoryInputObjectZodSchema =
  makeSchema()
