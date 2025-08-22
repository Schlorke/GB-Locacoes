import { z } from 'zod';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserCreateManyInputObjectSchema } from './objects/UserCreateManyInput.schema'

export const UserCreateManyAndReturnSchema = z.object({ select: UserSelectObjectSchema.optional(), include: UserIncludeObjectSchema.optional(), data: z.union([ UserCreateManyInputObjectSchema, z.array(UserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })