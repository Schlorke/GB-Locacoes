import { z } from 'zod'
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema'

export const rentalsDeleteManySchema = z.object({
  where: rentalsWhereInputObjectSchema.optional(),
})
