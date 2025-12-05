/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteOrderByWithRelationInputObjectSchema as QuoteOrderByWithRelationInputObjectSchema } from './objects/QuoteOrderByWithRelationInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema';
import { QuoteScalarFieldEnumSchema } from './enums/QuoteScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const QuoteFindManySelectSchema: z.ZodType<Prisma.QuoteSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    cpf: z.boolean().optional(),
    cnpj: z.boolean().optional(),
    cep: z.boolean().optional(),
    company: z.boolean().optional(),
    message: z.boolean().optional(),
    total: z.boolean().optional(),
    status: z.boolean().optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    items: z.boolean().optional(),
    user: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.QuoteSelect>;

export const QuoteFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    cpf: z.boolean().optional(),
    cnpj: z.boolean().optional(),
    cep: z.boolean().optional(),
    company: z.boolean().optional(),
    message: z.boolean().optional(),
    total: z.boolean().optional(),
    status: z.boolean().optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    items: z.boolean().optional(),
    user: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const QuoteFindManySchema: z.ZodType<Prisma.QuoteFindManyArgs> = z.object({ select: QuoteFindManySelectSchema.optional(), include: z.lazy(() => QuoteIncludeObjectSchema.optional()), orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteScalarFieldEnumSchema, QuoteScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.QuoteFindManyArgs>;

export const QuoteFindManyZodSchema = z.object({ select: QuoteFindManySelectSchema.optional(), include: z.lazy(() => QuoteIncludeObjectSchema.optional()), orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteScalarFieldEnumSchema, QuoteScalarFieldEnumSchema.array()]).optional() }).strict();