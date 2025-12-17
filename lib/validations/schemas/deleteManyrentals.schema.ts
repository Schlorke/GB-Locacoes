/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';

export const rentalsDeleteManySchema: z.ZodType<Prisma.rentalsDeleteManyArgs> = z.object({ where: rentalsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rentalsDeleteManyArgs>;

export const rentalsDeleteManyZodSchema = z.object({ where: rentalsWhereInputObjectSchema.optional() }).strict();