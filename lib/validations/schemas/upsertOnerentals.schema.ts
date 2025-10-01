/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsIncludeObjectSchema as rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';
import { rentalsCreateInputObjectSchema as rentalsCreateInputObjectSchema } from './objects/rentalsCreateInput.schema';
import { rentalsUncheckedCreateInputObjectSchema as rentalsUncheckedCreateInputObjectSchema } from './objects/rentalsUncheckedCreateInput.schema';
import { rentalsUpdateInputObjectSchema as rentalsUpdateInputObjectSchema } from './objects/rentalsUpdateInput.schema';
import { rentalsUncheckedUpdateInputObjectSchema as rentalsUncheckedUpdateInputObjectSchema } from './objects/rentalsUncheckedUpdateInput.schema';

export const rentalsUpsertOneSchema: z.ZodType<Prisma.rentalsUpsertArgs> = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema, create: z.union([ rentalsCreateInputObjectSchema, rentalsUncheckedCreateInputObjectSchema ]), update: z.union([ rentalsUpdateInputObjectSchema, rentalsUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.rentalsUpsertArgs>;

export const rentalsUpsertOneZodSchema = z.object({ select: rentalsSelectObjectSchema.optional(), include: rentalsIncludeObjectSchema.optional(), where: rentalsWhereUniqueInputObjectSchema, create: z.union([ rentalsCreateInputObjectSchema, rentalsUncheckedCreateInputObjectSchema ]), update: z.union([ rentalsUpdateInputObjectSchema, rentalsUncheckedUpdateInputObjectSchema ]) }).strict();