/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AddressCreateManyInputObjectSchema as AddressCreateManyInputObjectSchema } from './objects/AddressCreateManyInput.schema';

export const AddressCreateManySchema: z.ZodType<Prisma.AddressCreateManyArgs> = z.object({ data: z.union([ AddressCreateManyInputObjectSchema, z.array(AddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AddressCreateManyArgs>;

export const AddressCreateManyZodSchema = z.object({ data: z.union([ AddressCreateManyInputObjectSchema, z.array(AddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();