import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressUpdateInputObjectSchema as AddressUpdateInputObjectSchema } from './objects/AddressUpdateInput.schema';
import { AddressUncheckedUpdateInputObjectSchema as AddressUncheckedUpdateInputObjectSchema } from './objects/AddressUncheckedUpdateInput.schema';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';

export const AddressUpdateOneSchema: z.ZodType<Prisma.AddressUpdateArgs> = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), data: z.union([AddressUpdateInputObjectSchema, AddressUncheckedUpdateInputObjectSchema]), where: AddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AddressUpdateArgs>;

export const AddressUpdateOneZodSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), data: z.union([AddressUpdateInputObjectSchema, AddressUncheckedUpdateInputObjectSchema]), where: AddressWhereUniqueInputObjectSchema }).strict();