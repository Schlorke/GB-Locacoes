import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';
import { AddressCreateInputObjectSchema } from './objects/AddressCreateInput.schema';
import { AddressUncheckedCreateInputObjectSchema } from './objects/AddressUncheckedCreateInput.schema';
import { AddressUpdateInputObjectSchema } from './objects/AddressUpdateInput.schema';
import { AddressUncheckedUpdateInputObjectSchema } from './objects/AddressUncheckedUpdateInput.schema';

export const AddressUpsertSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema, create: z.union([ AddressCreateInputObjectSchema, AddressUncheckedCreateInputObjectSchema ]), update: z.union([ AddressUpdateInputObjectSchema, AddressUncheckedUpdateInputObjectSchema ])  })