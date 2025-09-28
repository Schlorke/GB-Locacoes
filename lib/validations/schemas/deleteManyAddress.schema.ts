/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';

export const AddressDeleteManySchema: z.ZodType<Prisma.AddressDeleteManyArgs> = z.object({ where: AddressWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AddressDeleteManyArgs>;

export const AddressDeleteManyZodSchema = z.object({ where: AddressWhereInputObjectSchema.optional() }).strict();