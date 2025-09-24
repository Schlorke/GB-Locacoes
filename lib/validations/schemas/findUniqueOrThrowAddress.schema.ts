import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';

export const AddressFindUniqueOrThrowSchema: z.ZodType<Prisma.AddressFindUniqueOrThrowArgs> = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AddressFindUniqueOrThrowArgs>;

export const AddressFindUniqueOrThrowZodSchema = z.object({ select: AddressSelectObjectSchema.optional(), include: AddressIncludeObjectSchema.optional(), where: AddressWhereUniqueInputObjectSchema }).strict();