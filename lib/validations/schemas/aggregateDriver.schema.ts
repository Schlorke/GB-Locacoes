/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverOrderByWithRelationInputObjectSchema as DriverOrderByWithRelationInputObjectSchema } from './objects/DriverOrderByWithRelationInput.schema';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';
import { DriverCountAggregateInputObjectSchema as DriverCountAggregateInputObjectSchema } from './objects/DriverCountAggregateInput.schema';
import { DriverMinAggregateInputObjectSchema as DriverMinAggregateInputObjectSchema } from './objects/DriverMinAggregateInput.schema';
import { DriverMaxAggregateInputObjectSchema as DriverMaxAggregateInputObjectSchema } from './objects/DriverMaxAggregateInput.schema';

export const DriverAggregateSchema: z.ZodType<Prisma.DriverAggregateArgs> = z.object({ orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), DriverCountAggregateInputObjectSchema ]).optional(), _min: DriverMinAggregateInputObjectSchema.optional(), _max: DriverMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DriverAggregateArgs>;

export const DriverAggregateZodSchema = z.object({ orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), DriverCountAggregateInputObjectSchema ]).optional(), _min: DriverMinAggregateInputObjectSchema.optional(), _max: DriverMaxAggregateInputObjectSchema.optional() }).strict();