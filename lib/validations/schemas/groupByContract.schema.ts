/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';
import { ContractOrderByWithAggregationInputObjectSchema as ContractOrderByWithAggregationInputObjectSchema } from './objects/ContractOrderByWithAggregationInput.schema';
import { ContractScalarWhereWithAggregatesInputObjectSchema as ContractScalarWhereWithAggregatesInputObjectSchema } from './objects/ContractScalarWhereWithAggregatesInput.schema';
import { ContractScalarFieldEnumSchema } from './enums/ContractScalarFieldEnum.schema';
import { ContractCountAggregateInputObjectSchema as ContractCountAggregateInputObjectSchema } from './objects/ContractCountAggregateInput.schema';
import { ContractMinAggregateInputObjectSchema as ContractMinAggregateInputObjectSchema } from './objects/ContractMinAggregateInput.schema';
import { ContractMaxAggregateInputObjectSchema as ContractMaxAggregateInputObjectSchema } from './objects/ContractMaxAggregateInput.schema';

export const ContractGroupBySchema: z.ZodType<Prisma.ContractGroupByArgs> = z.object({ where: ContractWhereInputObjectSchema.optional(), orderBy: z.union([ContractOrderByWithAggregationInputObjectSchema, ContractOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ContractScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ContractScalarFieldEnumSchema), _count: z.union([ z.literal(true), ContractCountAggregateInputObjectSchema ]).optional(), _min: ContractMinAggregateInputObjectSchema.optional(), _max: ContractMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ContractGroupByArgs>;

export const ContractGroupByZodSchema = z.object({ where: ContractWhereInputObjectSchema.optional(), orderBy: z.union([ContractOrderByWithAggregationInputObjectSchema, ContractOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ContractScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ContractScalarFieldEnumSchema), _count: z.union([ z.literal(true), ContractCountAggregateInputObjectSchema ]).optional(), _min: ContractMinAggregateInputObjectSchema.optional(), _max: ContractMaxAggregateInputObjectSchema.optional() }).strict();