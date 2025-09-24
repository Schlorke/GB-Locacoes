import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressOrderByWithRelationInputObjectSchema } from './objects/AddressOrderByWithRelationInput.schema';
import { AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';
import { AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';
import { AddressCountAggregateInputObjectSchema } from './objects/AddressCountAggregateInput.schema';
import { AddressMinAggregateInputObjectSchema } from './objects/AddressMinAggregateInput.schema';
import { AddressMaxAggregateInputObjectSchema } from './objects/AddressMaxAggregateInput.schema';

export const AddressAggregateSchema: z.ZodType<Prisma.AddressAggregateArgs> = z.object({ orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional(), _min: AddressMinAggregateInputObjectSchema.optional(), _max: AddressMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AddressAggregateArgs>;

export const AddressAggregateZodSchema = z.object({ orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional(), _min: AddressMinAggregateInputObjectSchema.optional(), _max: AddressMaxAggregateInputObjectSchema.optional() }).strict();