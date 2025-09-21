import { z } from 'zod';
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsCreateManyInputObjectSchema } from './objects/rentalsCreateManyInput.schema';

export const rentalsCreateManyAndReturnSchema = z.object({ select: rentalsSelectObjectSchema.optional(), data: z.union([ rentalsCreateManyInputObjectSchema, z.array(rentalsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()