import { z } from 'zod';
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsCreateInputObjectSchema } from './objects/rentalsCreateInput.schema';
import { rentalsUncheckedCreateInputObjectSchema } from './objects/rentalsUncheckedCreateInput.schema';

export const rentalsCreateOneSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), data: z.union([rentalsCreateInputObjectSchema, rentalsUncheckedCreateInputObjectSchema])  })