/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CategoryArgsObjectSchema as CategoryArgsObjectSchema } from './CategoryArgs.schema'
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema'
import { rental_itemsFindManySchema as rental_itemsFindManySchema } from '../findManyrental_items.schema'
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema'
import { EquipmentCountOutputTypeArgsObjectSchema as EquipmentCountOutputTypeArgsObjectSchema } from './EquipmentCountOutputTypeArgs.schema'

const makeSchema = () =>
  z
    .object({
      category: z
        .union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)])
        .optional(),
      quoteItems: z
        .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
        .optional(),
      rental_items: z
        .union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)])
        .optional(),
      cartItems: z
        .union([z.boolean(), z.lazy(() => CartItemFindManySchema)])
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
