import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema as rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';

export const rentalsFindUniqueOrThrowSchema: z.ZodType<Prisma.rentalsFindUniqueOrThrowArgs> = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.rentalsFindUniqueOrThrowArgs>;

export const rentalsFindUniqueOrThrowZodSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema }).strict();