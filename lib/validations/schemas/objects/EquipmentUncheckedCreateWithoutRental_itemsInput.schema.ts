import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema'
import { QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput.schema'

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
      categoryId: z.string(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      category_id: z.string().nullish(),
      quoteItems: z
        .lazy(
          () =>
            QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const EquipmentUncheckedCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateWithoutRental_itemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateWithoutRental_itemsInput>
export const EquipmentUncheckedCreateWithoutRental_itemsInputObjectZodSchema =
  makeSchema()
