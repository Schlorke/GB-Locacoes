/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rentalsCreateManyInputObjectSchema as rentalsCreateManyInputObjectSchema } from './objects/rentalsCreateManyInput.schema';

export const rentalsCreateManySchema: z.ZodType<Prisma.rentalsCreateManyArgs> = z.object({ data: z.union([ rentalsCreateManyInputObjectSchema, z.array(rentalsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.rentalsCreateManyArgs>;

export const rentalsCreateManyZodSchema = z.object({ data: z.union([ rentalsCreateManyInputObjectSchema, z.array(rentalsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();