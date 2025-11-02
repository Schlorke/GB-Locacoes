import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AddressOrderByWithRelationInputObjectSchema as AddressOrderByWithRelationInputObjectSchema } from './objects/AddressOrderByWithRelationInput.schema';
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';
import { AddressCountAggregateInputObjectSchema as AddressCountAggregateInputObjectSchema } from './objects/AddressCountAggregateInput.schema';
import { AddressMinAggregateInputObjectSchema as AddressMinAggregateInputObjectSchema } from './objects/AddressMinAggregateInput.schema';
import { AddressMaxAggregateInputObjectSchema as AddressMaxAggregateInputObjectSchema } from './objects/AddressMaxAggregateInput.schema';

export const AddressAggregateSchema: z.ZodType<Prisma.AddressAggregateArgs> = z.object({ orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional(), _min: AddressMinAggregateInputObjectSchema.optional(), _max: AddressMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AddressAggregateArgs>;

export const AddressAggregateZodSchema = z.object({ orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional(), _min: AddressMinAggregateInputObjectSchema.optional(), _max: AddressMaxAggregateInputObjectSchema.optional() }).strict();