import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ContractIncludeObjectSchema as ContractIncludeObjectSchema } from './objects/ContractInclude.schema';
import { ContractOrderByWithRelationInputObjectSchema as ContractOrderByWithRelationInputObjectSchema } from './objects/ContractOrderByWithRelationInput.schema';
import { ContractWhereInputObjectSchema as ContractWhereInputObjectSchema } from './objects/ContractWhereInput.schema';
import { ContractWhereUniqueInputObjectSchema as ContractWhereUniqueInputObjectSchema } from './objects/ContractWhereUniqueInput.schema';
import { ContractScalarFieldEnumSchema } from './enums/ContractScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ContractFindFirstSelectSchema: z.ZodType<Prisma.ContractSelect> = z.object({
    id: z.boolean().optional(),
    rentalId: z.boolean().optional(),
    template: z.boolean().optional(),
    content: z.boolean().optional(),
    pdfUrl: z.boolean().optional(),
    signedAt: z.boolean().optional(),
    signedBy: z.boolean().optional(),
    zapSignId: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    rental: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ContractSelect>;

export const ContractFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    rentalId: z.boolean().optional(),
    template: z.boolean().optional(),
    content: z.boolean().optional(),
    pdfUrl: z.boolean().optional(),
    signedAt: z.boolean().optional(),
    signedBy: z.boolean().optional(),
    zapSignId: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    rental: z.boolean().optional()
  }).strict();

export const ContractFindFirstSchema: z.ZodType<Prisma.ContractFindFirstArgs> = z.object({ select: ContractFindFirstSelectSchema.optional(), include: z.lazy(() => ContractIncludeObjectSchema.optional()), orderBy: z.union([ContractOrderByWithRelationInputObjectSchema, ContractOrderByWithRelationInputObjectSchema.array()]).optional(), where: ContractWhereInputObjectSchema.optional(), cursor: ContractWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ContractScalarFieldEnumSchema, ContractScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ContractFindFirstArgs>;

export const ContractFindFirstZodSchema = z.object({ select: ContractFindFirstSelectSchema.optional(), include: z.lazy(() => ContractIncludeObjectSchema.optional()), orderBy: z.union([ContractOrderByWithRelationInputObjectSchema, ContractOrderByWithRelationInputObjectSchema.array()]).optional(), where: ContractWhereInputObjectSchema.optional(), cursor: ContractWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ContractScalarFieldEnumSchema, ContractScalarFieldEnumSchema.array()]).optional() }).strict();