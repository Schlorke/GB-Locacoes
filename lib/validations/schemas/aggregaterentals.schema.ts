/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsOrderByWithRelationInputObjectSchema as rentalsOrderByWithRelationInputObjectSchema } from './objects/rentalsOrderByWithRelationInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';
import { RentalsCountAggregateInputObjectSchema as RentalsCountAggregateInputObjectSchema } from './objects/RentalsCountAggregateInput.schema';
import { RentalsMinAggregateInputObjectSchema as RentalsMinAggregateInputObjectSchema } from './objects/RentalsMinAggregateInput.schema';
import { RentalsMaxAggregateInputObjectSchema as RentalsMaxAggregateInputObjectSchema } from './objects/RentalsMaxAggregateInput.schema';
import { RentalsAvgAggregateInputObjectSchema as RentalsAvgAggregateInputObjectSchema } from './objects/RentalsAvgAggregateInput.schema';
import { RentalsSumAggregateInputObjectSchema as RentalsSumAggregateInputObjectSchema } from './objects/RentalsSumAggregateInput.schema';

export const rentalsAggregateSchema: z.ZodType<Prisma.rentalsAggregateArgs> = z.object({ orderBy: z.union([rentalsOrderByWithRelationInputObjectSchema, rentalsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rentalsWhereInputObjectSchema.optional(), cursor: rentalsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional(), _min: RentalsMinAggregateInputObjectSchema.optional(), _max: RentalsMaxAggregateInputObjectSchema.optional(), _avg: RentalsAvgAggregateInputObjectSchema.optional(), _sum: RentalsSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rentalsAggregateArgs>;

export const rentalsAggregateZodSchema = z.object({ orderBy: z.union([rentalsOrderByWithRelationInputObjectSchema, rentalsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rentalsWhereInputObjectSchema.optional(), cursor: rentalsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional(), _min: RentalsMinAggregateInputObjectSchema.optional(), _max: RentalsMaxAggregateInputObjectSchema.optional(), _avg: RentalsAvgAggregateInputObjectSchema.optional(), _sum: RentalsSumAggregateInputObjectSchema.optional() }).strict();