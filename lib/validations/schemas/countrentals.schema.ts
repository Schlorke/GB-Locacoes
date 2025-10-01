/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsOrderByWithRelationInputObjectSchema as rentalsOrderByWithRelationInputObjectSchema } from './objects/rentalsOrderByWithRelationInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';
import { RentalsCountAggregateInputObjectSchema as RentalsCountAggregateInputObjectSchema } from './objects/RentalsCountAggregateInput.schema';

export const rentalsCountSchema: z.ZodType<Prisma.rentalsCountArgs> = z.object({ orderBy: z.union([rentalsOrderByWithRelationInputObjectSchema, rentalsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rentalsWhereInputObjectSchema.optional(), cursor: rentalsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.rentalsCountArgs>;

export const rentalsCountZodSchema = z.object({ orderBy: z.union([rentalsOrderByWithRelationInputObjectSchema, rentalsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rentalsWhereInputObjectSchema.optional(), cursor: rentalsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional() }).strict();