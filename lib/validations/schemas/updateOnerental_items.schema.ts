import { z } from 'zod'
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema'
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema'
import { rental_itemsUpdateInputObjectSchema } from './objects/rental_itemsUpdateInput.schema'
import { rental_itemsUncheckedUpdateInputObjectSchema } from './objects/rental_itemsUncheckedUpdateInput.schema'
import { rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema'

export const rental_itemsUpdateOneSchema = z.object({
  select: rental_itemsSelectObjectSchema.optional(),
  include: rental_itemsIncludeObjectSchema.optional(),
  data: z.union([
    rental_itemsUpdateInputObjectSchema,
    rental_itemsUncheckedUpdateInputObjectSchema,
  ]),
  where: rental_itemsWhereUniqueInputObjectSchema,
})
