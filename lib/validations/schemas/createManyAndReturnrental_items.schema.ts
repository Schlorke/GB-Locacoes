import { z } from 'zod';
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema';
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema';
import { rental_itemsCreateManyInputObjectSchema } from './objects/rental_itemsCreateManyInput.schema'

export const rental_itemsCreateManyAndReturnSchema = z.object({ select: rental_itemsSelectObjectSchema.optional(), include: rental_itemsIncludeObjectSchema.optional(), data: z.union([ rental_itemsCreateManyInputObjectSchema, z.array(rental_itemsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })