import { z } from 'zod';
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';
import { rentalsCreateInputObjectSchema } from './objects/rentalsCreateInput.schema';
import { rentalsUncheckedCreateInputObjectSchema } from './objects/rentalsUncheckedCreateInput.schema';
import { rentalsUpdateInputObjectSchema } from './objects/rentalsUpdateInput.schema';
import { rentalsUncheckedUpdateInputObjectSchema } from './objects/rentalsUncheckedUpdateInput.schema';

export const rentalsUpsertSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema, create: z.union([ rentalsCreateInputObjectSchema, rentalsUncheckedCreateInputObjectSchema ]), update: z.union([ rentalsUpdateInputObjectSchema, rentalsUncheckedUpdateInputObjectSchema ])  })