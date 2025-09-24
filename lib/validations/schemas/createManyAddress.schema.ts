import { z } from 'zod';
import { AddressCreateManyInputObjectSchema } from './objects/AddressCreateManyInput.schema';

export const AddressCreateManySchema = z.object({ data: z.union([ AddressCreateManyInputObjectSchema, z.array(AddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })