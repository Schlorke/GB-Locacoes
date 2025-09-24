import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressCreateInputObjectSchema } from './objects/AddressCreateInput.schema';
import { AddressUncheckedCreateInputObjectSchema } from './objects/AddressUncheckedCreateInput.schema';

export const AddressCreateOneSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), data: z.union([AddressCreateInputObjectSchema, AddressUncheckedCreateInputObjectSchema])  })