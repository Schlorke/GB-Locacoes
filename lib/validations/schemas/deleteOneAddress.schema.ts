/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';

export const AddressDeleteOneSchema: z.ZodType<Prisma.AddressDeleteArgs> = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AddressDeleteArgs>;

export const AddressDeleteOneZodSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema }).strict();