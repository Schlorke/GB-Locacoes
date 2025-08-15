import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { CategoryArgsObjectSchema } from './CategoryArgs.schema'
import { QuoteItemFindManySchema } from '../findManyQuoteItem.schema'
import { Rental_itemsFindManySchema } from '../findManyrental_items.schema'
import { EquipmentCountOutputTypeArgsObjectSchema } from './EquipmentCountOutputTypeArgs.schema'

export const EquipmentSelectObjectSchema: z.ZodType<
  Prisma.EquipmentSelect,
  Prisma.EquipmentSelect
> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    images: z.boolean().optional(),
    available: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category_id: z.boolean().optional(),
    category: z
      .union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)])
      .optional(),
    quoteItems: z
      .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
      .optional(),
    rental_items: z
      .union([z.boolean(), z.lazy(() => Rental_itemsFindManySchema)])
      .optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => EquipmentCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()
export const EquipmentSelectObjectZodSchema = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    images: z.boolean().optional(),
    available: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category_id: z.boolean().optional(),
    category: z
      .union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)])
      .optional(),
    quoteItems: z
      .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
      .optional(),
    rental_items: z
      .union([z.boolean(), z.lazy(() => Rental_itemsFindManySchema)])
      .optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => EquipmentCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()
