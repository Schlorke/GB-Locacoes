import { z } from 'zod'
import { rentalsUpdateManyMutationInputObjectSchema } from './objects/rentalsUpdateManyMutationInput.schema'
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema'

export const rentalsUpdateManySchema = z.object({
  data: rentalsUpdateManyMutationInputObjectSchema,
  where: rentalsWhereInputObjectSchema.optional(),
})
