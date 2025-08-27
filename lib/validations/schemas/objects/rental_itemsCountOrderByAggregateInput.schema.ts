import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      rentalid: SortOrderSchema.optional(),
      equipmentid: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      priceperday: SortOrderSchema.optional(),
      totaldays: SortOrderSchema.optional(),
      totalprice: SortOrderSchema.optional(),
      createdat: SortOrderSchema.optional(),
      updatedat: SortOrderSchema.optional(),
    })
    .strict()
export const rental_itemsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rental_itemsCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCountOrderByAggregateInput>
export const rental_itemsCountOrderByAggregateInputObjectZodSchema =
  makeSchema()
