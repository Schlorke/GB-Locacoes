import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressUpdateInputObjectSchema } from './objects/AddressUpdateInput.schema';
import { AddressUncheckedUpdateInputObjectSchema } from './objects/AddressUncheckedUpdateInput.schema';
import { AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';

export const AddressUpdateOneSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), data: z.union([AddressUpdateInputObjectSchema, AddressUncheckedUpdateInputObjectSchema]), where: AddressWhereUniqueInputObjectSchema  })