/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractOrderByWithRelationInputObjectSchema as ContractOrderByWithRelationInputObjectSchema } from './objects/ContractOrderByWithRelationInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';
import { ContractCountAggregateInputObjectSchema as ContractCountAggregateInputObjectSchema } from './objects/ContractCountAggregateInput.schema';
import { ContractMinAggregateInputObjectSchema as ContractMinAggregateInputObjectSchema } from './objects/ContractMinAggregateInput.schema';
import { ContractMaxAggregateInputObjectSchema as ContractMaxAggregateInputObjectSchema } from './objects/ContractMaxAggregateInput.schema';

export const ContractAggregateSchema: z.ZodType<Prisma.ContractAggregateArgs> = z.object({ orderBy: z.union([ContractOrderByWithRelationInputObjectSchema, ContractOrderByWithRelationInputObjectSchema.array()]).optional(), where: ContractWhereInputObjectSchema.optional(), cursor: ContractWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ContractCountAggregateInputObjectSchema ]).optional(), _min: ContractMinAggregateInputObjectSchema.optional(), _max: ContractMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ContractAggregateArgs>;

export const ContractAggregateZodSchema = z.object({ orderBy: z.union([ContractOrderByWithRelationInputObjectSchema, ContractOrderByWithRelationInputObjectSchema.array()]).optional(), where: ContractWhereInputObjectSchema.optional(), cursor: ContractWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ContractCountAggregateInputObjectSchema ]).optional(), _min: ContractMinAggregateInputObjectSchema.optional(), _max: ContractMaxAggregateInputObjectSchema.optional() }).strict();