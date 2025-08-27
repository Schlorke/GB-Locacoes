import { z } from 'zod'
import { CategorySelectObjectSchema } from './objects/CategorySelect.schema'
import { CategoryCreateManyInputObjectSchema } from './objects/CategoryCreateManyInput.schema'

export const CategoryCreateManyAndReturnSchema = z
  .object({
    select: CategorySelectObjectSchema.optional(),
    data: z.union([
      CategoryCreateManyInputObjectSchema,
      z.array(CategoryCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
