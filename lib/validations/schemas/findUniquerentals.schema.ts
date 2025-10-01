/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema as rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';

export const rentalsFindUniqueSchema: z.ZodType<Prisma.rentalsFindUniqueArgs> = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.rentalsFindUniqueArgs>;

export const rentalsFindUniqueZodSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema }).strict();