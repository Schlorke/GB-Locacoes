import { z } from 'zod';
import { CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryUpdateManyMutationInputObjectSchema } from './objects/CategoryUpdateManyMutationInput.schema';
import { CategoryWhereInputObjectSchema } from './objects/CategoryWhereInput.schema';

export const CategoryUpdateManyAndReturnSchema = z.object({ select: CategorySelectObjectSchema.optional(), data: CategoryUpdateManyMutationInputObjectSchema, where: CategoryWhereInputObjectSchema.optional()  }).strict()