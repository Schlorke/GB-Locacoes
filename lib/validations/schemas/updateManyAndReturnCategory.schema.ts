import { z } from 'zod';
import { CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryUpdateManyMutationInputObjectSchema } from './objects/CategoryUpdateManyMutationInput.schema';
import { CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema'

export const CategoryUpdateManyAndReturnSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), data: CategoryUpdateManyMutationInputObjectSchema, where: CategoryWhereInputObjectSchema.optional()  })