import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';
import { AddressCreateInputObjectSchema as AddressCreateInputObjectSchema } from './objects/AddressCreateInput.schema';
import { AddressUncheckedCreateInputObjectSchema as AddressUncheckedCreateInputObjectSchema } from './objects/AddressUncheckedCreateInput.schema';
import { AddressUpdateInputObjectSchema as AddressUpdateInputObjectSchema } from './objects/AddressUpdateInput.schema';
import { AddressUncheckedUpdateInputObjectSchema as AddressUncheckedUpdateInputObjectSchema } from './objects/AddressUncheckedUpdateInput.schema';

export const AddressUpsertOneSchema: z.ZodType<Prisma.AddressUpsertArgs> = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema, create: z.union([ AddressCreateInputObjectSchema, AddressUncheckedCreateInputObjectSchema ]), update: z.union([ AddressUpdateInputObjectSchema, AddressUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AddressUpsertArgs>;

export const AddressUpsertOneZodSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema, create: z.union([ AddressCreateInputObjectSchema, AddressUncheckedCreateInputObjectSchema ]), update: z.union([ AddressUpdateInputObjectSchema, AddressUncheckedUpdateInputObjectSchema ]) }).strict();