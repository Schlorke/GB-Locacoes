import { z } from 'zod';
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsUpdateInputObjectSchema } from './objects/rentalsUpdateInput.schema';
import { rentalsUncheckedUpdateInputObjectSchema } from './objects/rentalsUncheckedUpdateInput.schema';
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';

export const rentalsUpdateOneSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), data: z.union([rentalsUpdateInputObjectSchema, rentalsUncheckedUpdateInputObjectSchema]), where: rentalsWhereUniqueInputObjectSchema  })