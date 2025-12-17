import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';
import { DriverOrderByWithAggregationInputObjectSchema as DriverOrderByWithAggregationInputObjectSchema } from './objects/DriverOrderByWithAggregationInput.schema';
import { DriverScalarWhereWithAggregatesInputObjectSchema as DriverScalarWhereWithAggregatesInputObjectSchema } from './objects/DriverScalarWhereWithAggregatesInput.schema';
import { DriverScalarFieldEnumSchema } from './enums/DriverScalarFieldEnum.schema';
import { DriverCountAggregateInputObjectSchema as DriverCountAggregateInputObjectSchema } from './objects/DriverCountAggregateInput.schema';
import { DriverMinAggregateInputObjectSchema as DriverMinAggregateInputObjectSchema } from './objects/DriverMinAggregateInput.schema';
import { DriverMaxAggregateInputObjectSchema as DriverMaxAggregateInputObjectSchema } from './objects/DriverMaxAggregateInput.schema';

export const DriverGroupBySchema: z.ZodType<Prisma.DriverGroupByArgs> = z.object({ where: DriverWhereInputObjectSchema.optional(), orderBy: z.union([DriverOrderByWithAggregationInputObjectSchema, DriverOrderByWithAggregationInputObjectSchema.array()]).optional(), having: DriverScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(DriverScalarFieldEnumSchema), _count: z.union([ z.literal(true), DriverCountAggregateInputObjectSchema ]).optional(), _min: DriverMinAggregateInputObjectSchema.optional(), _max: DriverMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DriverGroupByArgs>;

export const DriverGroupByZodSchema = z.object({ where: DriverWhereInputObjectSchema.optional(), orderBy: z.union([DriverOrderByWithAggregationInputObjectSchema, DriverOrderByWithAggregationInputObjectSchema.array()]).optional(), having: DriverScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(DriverScalarFieldEnumSchema), _count: z.union([ z.literal(true), DriverCountAggregateInputObjectSchema ]).optional(), _min: DriverMinAggregateInputObjectSchema.optional(), _max: DriverMaxAggregateInputObjectSchema.optional() }).strict();