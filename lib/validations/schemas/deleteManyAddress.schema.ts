import { z } from 'zod';
import { AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';

export const AddressDeleteManySchema = z.object({ where: AddressWhereInputObjectSchema.optional()  })