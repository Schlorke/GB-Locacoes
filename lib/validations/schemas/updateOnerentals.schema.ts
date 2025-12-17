import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema as rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsUpdateInputObjectSchema as rentalsUpdateInputObjectSchema } from './objects/rentalsUpdateInput.schema';
import { rentalsUncheckedUpdateInputObjectSchema as rentalsUncheckedUpdateInputObjectSchema } from './objects/rentalsUncheckedUpdateInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';

export const rentalsUpdateOneSchema: z.ZodType<Prisma.rentalsUpdateArgs> = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), data: z.union([rentalsUpdateInputObjectSchema, rentalsUncheckedUpdateInputObjectSchema]), where: rentalsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.rentalsUpdateArgs>;

export const rentalsUpdateOneZodSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), data: z.union([rentalsUpdateInputObjectSchema, rentalsUncheckedUpdateInputObjectSchema]), where: rentalsWhereUniqueInputObjectSchema }).strict();