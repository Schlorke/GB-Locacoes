import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';

export const AddressFindUniqueSchema: z.ZodType<Prisma.AddressFindUniqueArgs> = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AddressFindUniqueArgs>;

export const AddressFindUniqueZodSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema }).strict();