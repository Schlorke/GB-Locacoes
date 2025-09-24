import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressOrderByWithRelationInputObjectSchema } from './objects/AddressOrderByWithRelationInput.schema';
import { AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';
import { AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';
import { AddressCountAggregateInputObjectSchema } from './objects/AddressCountAggregateInput.schema';

export const AddressCountSchema: z.ZodType<Prisma.AddressCountArgs> = z.object({ orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AddressCountArgs>;

export const AddressCountZodSchema = z.object({ orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional() }).strict();