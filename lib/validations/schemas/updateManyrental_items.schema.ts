import { z } from 'zod'
import { rental_itemsUpdateManyMutationInputObjectSchema } from './objects/rental_itemsUpdateManyMutationInput.schema'
import { rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema'

export const rental_itemsUpdateManySchema = z.object({
  data: rental_itemsUpdateManyMutationInputObjectSchema,
  where: rental_itemsWhereInputObjectSchema.optional(),
})
