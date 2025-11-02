import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsUpdateManyMutationInputObjectSchema as rentalsUpdateManyMutationInputObjectSchema } from './objects/rentalsUpdateManyMutationInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';

export const rentalsUpdateManySchema: z.ZodType<Prisma.rentalsUpdateManyArgs> = z.object({ data: rentalsUpdateManyMutationInputObjectSchema, where: rentalsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rentalsUpdateManyArgs>;

export const rentalsUpdateManyZodSchema = z.object({ data: rentalsUpdateManyMutationInputObjectSchema, where: rentalsWhereInputObjectSchema.optional() }).strict();