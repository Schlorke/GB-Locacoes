import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rentalsOrderByWithRelationInputObjectSchema } from './objects/rentalsOrderByWithRelationInput.schema';
import { rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';
import { rentalsWhereUniqueInputObjectSchema } from './objects/rentalsWhereUniqueInput.schema';
import { RentalsCountAggregateInputObjectSchema } from './objects/RentalsCountAggregateInput.schema';
import { RentalsMinAggregateInputObjectSchema } from './objects/RentalsMinAggregateInput.schema';
import { RentalsMaxAggregateInputObjectSchema } from './objects/RentalsMaxAggregateInput.schema';
import { RentalsAvgAggregateInputObjectSchema } from './objects/RentalsAvgAggregateInput.schema';
import { RentalsSumAggregateInputObjectSchema } from './objects/RentalsSumAggregateInput.schema';

export const rentalsAggregateSchema: z.ZodType<Prisma.rentalsAggregateArgs> = z.object({ orderBy: z.union([rentalsOrderByWithRelationInputObjectSchema, rentalsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rentalsWhereInputObjectSchema.optional(), cursor: rentalsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional(), _min: RentalsMinAggregateInputObjectSchema.optional(), _max: RentalsMaxAggregateInputObjectSchema.optional(), _avg: RentalsAvgAggregateInputObjectSchema.optional(), _sum: RentalsSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rentalsAggregateArgs>;

export const rentalsAggregateZodSchema = z.object({ orderBy: z.union([rentalsOrderByWithRelationInputObjectSchema, rentalsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rentalsWhereInputObjectSchema.optional(), cursor: rentalsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional(), _min: RentalsMinAggregateInputObjectSchema.optional(), _max: RentalsMaxAggregateInputObjectSchema.optional(), _avg: RentalsAvgAggregateInputObjectSchema.optional(), _sum: RentalsSumAggregateInputObjectSchema.optional() }).strict();