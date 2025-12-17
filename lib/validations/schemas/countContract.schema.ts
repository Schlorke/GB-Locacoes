import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractOrderByWithRelationInputObjectSchema as ContractOrderByWithRelationInputObjectSchema } from './objects/ContractOrderByWithRelationInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';
import { ContractCountAggregateInputObjectSchema as ContractCountAggregateInputObjectSchema } from './objects/ContractCountAggregateInput.schema';

export const ContractCountSchema: z.ZodType<Prisma.ContractCountArgs> = z.object({ orderBy: z.union([ContractOrderByWithRelationInputObjectSchema, ContractOrderByWithRelationInputObjectSchema.array()]).optional(), where: ContractWhereInputObjectSchema.optional(), cursor: ContractWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ContractCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ContractCountArgs>;

export const ContractCountZodSchema = z.object({ orderBy: z.union([ContractOrderByWithRelationInputObjectSchema, ContractOrderByWithRelationInputObjectSchema.array()]).optional(), where: ContractWhereInputObjectSchema.optional(), cursor: ContractWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ContractCountAggregateInputObjectSchema ]).optional() }).strict();