import { z } from 'zod';
import { AddressUpdateManyMutationInputObjectSchema } from './objects/AddressUpdateManyMutationInput.schema';
import { AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';

export const AddressUpdateManySchema = z.object({ data: AddressUpdateManyMutationInputObjectSchema, where: AddressWhereInputObjectSchema.optional()  })