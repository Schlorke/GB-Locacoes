import { z } from 'zod'
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema'
import { rentalsUpdateManyMutationInputObjectSchema } from './objects/rentalsUpdateManyMutationInput.schema'
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema'

export const rentalsUpdateManyAndReturnSchema = z
  .object({
    select: rentalsSelectObjectSchema.optional(),
    data: rentalsUpdateManyMutationInputObjectSchema,
    where: rentalsWhereInputObjectSchema.optional(),
  })
  .strict()
