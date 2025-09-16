import { z } from 'zod';
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';

export const rentalsDeleteOneSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema  })