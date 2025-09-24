import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressCreateManyInputObjectSchema } from './objects/AddressCreateManyInput.schema';

export const AddressCreateManyAndReturnSchema = z.object({ select: AddressSelectObjectSchema.optional(), data: z.union([ AddressCreateManyInputObjectSchema, z.array(AddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()