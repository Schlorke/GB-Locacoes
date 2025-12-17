/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './objects/rentalsWhereInput.schema';
import { rentalsOrderByWithAggregationInputObjectSchema as rentalsOrderByWithAggregationInputObjectSchema } from './objects/rentalsOrderByWithAggregationInput.schema';
import { rentalsScalarWhereWithAggregatesInputObjectSchema as rentalsScalarWhereWithAggregatesInputObjectSchema } from './objects/rentalsScalarWhereWithAggregatesInput.schema';
import { RentalsScalarFieldEnumSchema } from './enums/RentalsScalarFieldEnum.schema';
import { RentalsCountAggregateInputObjectSchema as RentalsCountAggregateInputObjectSchema } from './objects/RentalsCountAggregateInput.schema';
import { RentalsMinAggregateInputObjectSchema as RentalsMinAggregateInputObjectSchema } from './objects/RentalsMinAggregateInput.schema';
import { RentalsMaxAggregateInputObjectSchema as RentalsMaxAggregateInputObjectSchema } from './objects/RentalsMaxAggregateInput.schema';
import { RentalsAvgAggregateInputObjectSchema as RentalsAvgAggregateInputObjectSchema } from './objects/RentalsAvgAggregateInput.schema';
import { RentalsSumAggregateInputObjectSchema as RentalsSumAggregateInputObjectSchema } from './objects/RentalsSumAggregateInput.schema';

export const rentalsGroupBySchema: z.ZodType<Prisma.rentalsGroupByArgs> = z.object({ where: rentalsWhereInputObjectSchema.optional(), orderBy: z.union([rentalsOrderByWithAggregationInputObjectSchema, rentalsOrderByWithAggregationInputObjectSchema.array()]).optional(), having: rentalsScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RentalsScalarFieldEnumSchema), _count: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional(), _min: RentalsMinAggregateInputObjectSchema.optional(), _max: RentalsMaxAggregateInputObjectSchema.optional(), _avg: RentalsAvgAggregateInputObjectSchema.optional(), _sum: RentalsSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rentalsGroupByArgs>;

export const rentalsGroupByZodSchema = z.object({ where: rentalsWhereInputObjectSchema.optional(), orderBy: z.union([rentalsOrderByWithAggregationInputObjectSchema, rentalsOrderByWithAggregationInputObjectSchema.array()]).optional(), having: rentalsScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RentalsScalarFieldEnumSchema), _count: z.union([ z.literal(true), RentalsCountAggregateInputObjectSchema ]).optional(), _min: RentalsMinAggregateInputObjectSchema.optional(), _max: RentalsMaxAggregateInputObjectSchema.optional(), _avg: RentalsAvgAggregateInputObjectSchema.optional(), _sum: RentalsSumAggregateInputObjectSchema.optional() }).strict();