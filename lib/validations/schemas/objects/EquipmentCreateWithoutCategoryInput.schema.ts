import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema'
import { QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemCreateNestedManyWithoutEquipmentInput.schema'
import { rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutEquipmentsInput.schema'

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
        .lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema)
        .optional(),
      rental_items: z
        .lazy(
          () => rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const EquipmentCreateWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentCreateWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateWithoutCategoryInput>
export const EquipmentCreateWithoutCategoryInputObjectZodSchema = makeSchema()
