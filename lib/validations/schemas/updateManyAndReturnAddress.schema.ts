import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressUpdateManyMutationInputObjectSchema } from './objects/AddressUpdateManyMutationInput.schema';
import { AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';

export const AddressUpdateManyAndReturnSchema = z.object({ select: AddressSelectObjectSchema.optional(), data: AddressUpdateManyMutationInputObjectSchema, where: AddressWhereInputObjectSchema.optional()  }).strict()