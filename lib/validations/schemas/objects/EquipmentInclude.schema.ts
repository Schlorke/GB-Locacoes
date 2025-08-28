import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CategoryArgsObjectSchema } from './CategoryArgs.schema'
import { QuoteItemFindManySchema } from '../findManyQuoteItem.schema'
import { Rental_itemsFindManySchema } from '../findManyrental_items.schema'
import { EquipmentCountOutputTypeArgsObjectSchema } from './EquipmentCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
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
export const EquipmentIncludeObjectSchema: z.ZodType<Prisma.EquipmentInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentInclude>
export const EquipmentIncludeObjectZodSchema = makeSchema()
