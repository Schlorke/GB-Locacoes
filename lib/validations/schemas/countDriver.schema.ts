import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverOrderByWithRelationInputObjectSchema as DriverOrderByWithRelationInputObjectSchema } from './objects/DriverOrderByWithRelationInput.schema';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';
import { DriverCountAggregateInputObjectSchema as DriverCountAggregateInputObjectSchema } from './objects/DriverCountAggregateInput.schema';

export const DriverCountSchema: z.ZodType<Prisma.DriverCountArgs> = z.object({ orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DriverCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.DriverCountArgs>;

export const DriverCountZodSchema = z.object({ orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DriverCountAggregateInputObjectSchema ]).optional() }).strict();