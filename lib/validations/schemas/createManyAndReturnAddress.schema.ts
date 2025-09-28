/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './objects/AddressSelect.schema';
import { AddressCreateManyInputObjectSchema as AddressCreateManyInputObjectSchema } from './objects/AddressCreateManyInput.schema';

export const AddressCreateManyAndReturnSchema: z.ZodType<Prisma.AddressCreateManyAndReturnArgs> = z.object({ select: AddressSelectObjectSchema.optional(), data: z.union([ AddressCreateManyInputObjectSchema, z.array(AddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AddressCreateManyAndReturnArgs>;

export const AddressCreateManyAndReturnZodSchema = z.object({ select: AddressSelectObjectSchema.optional(), data: z.union([ AddressCreateManyInputObjectSchema, z.array(AddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();