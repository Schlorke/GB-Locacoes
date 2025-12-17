import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema';
import { rentalsUpdateManyMutationInputObjectSchema as rentalsUpdateManyMutationInputObjectSchema } from './objects/rentalsUpdateManyMutationInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';

export const rentalsUpdateManyAndReturnSchema: z.ZodType<Prisma.rentalsUpdateManyAndReturnArgs> = z.object({ select: rentalsSelectObjectSchema.optional(), data: rentalsUpdateManyMutationInputObjectSchema, where: rentalsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rentalsUpdateManyAndReturnArgs>;

export const rentalsUpdateManyAndReturnZodSchema = z.object({ select: rentalsSelectObjectSchema.optional(), data: rentalsUpdateManyMutationInputObjectSchema, where: rentalsWhereInputObjectSchema.optional() }).strict();