import { z } from 'zod';
import { CategorySelectObjectSchema } from './objects/CategorySelect.schema';
import { CategoryIncludeObjectSchema } from './objects/CategoryInclude.schema';
import { CategoryCreateManyInputObjectSchema } from './objects/CategoryCreateManyInput.schema'

export const CategoryCreateManyAndReturnSchema = z.object({ select: CategorySelectObjectSchema.optional(), include: CategoryIncludeObjectSchema.optional(), data: z.union([ CategoryCreateManyInputObjectSchema, z.array(CategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })