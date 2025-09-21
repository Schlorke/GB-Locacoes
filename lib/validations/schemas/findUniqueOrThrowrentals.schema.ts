import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';

export const rentalsFindUniqueOrThrowSchema: z.ZodType<Prisma.rentalsFindUniqueOrThrowArgs> = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.rentalsFindUniqueOrThrowArgs>;

export const rentalsFindUniqueOrThrowZodSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema }).strict();