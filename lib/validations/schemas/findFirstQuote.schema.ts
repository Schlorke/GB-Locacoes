import type { Prisma } from '../../../node_modules/.prisma/client';
import { z } from 'zod';
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteOrderByWithRelationInputObjectSchema } from './objects/QuoteOrderByWithRelationInput.schema';
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';
import { QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema';
import { QuoteScalarFieldEnumSchema } from './enums/QuoteScalarFieldEnum.schema';
import { QuoteItemArgsObjectSchema } from './objects/QuoteItemArgs.schema';
import { UserArgsObjectSchema } from './objects/UserArgs.schema';
import { QuoteCountOutputTypeArgsObjectSchema } from './objects/QuoteCountOutputTypeArgs.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const QuoteFindFirstSelectSchema: z.ZodType<Prisma.QuoteSelect, Prisma.QuoteSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
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

export const QuoteFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
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

export const QuoteFindFirstSchema: z.ZodType<Prisma.QuoteFindFirstArgs, Prisma.QuoteFindFirstArgs> = z.object({ select: QuoteFindFirstSelectSchema.optional(), include: z.lazy(() => QuoteIncludeObjectSchema.optional()), orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteScalarFieldEnumSchema, QuoteScalarFieldEnumSchema.array()]).optional() }).strict();

export const QuoteFindFirstZodSchema = z.object({ select: QuoteFindFirstSelectSchema.optional(), include: z.lazy(() => QuoteIncludeObjectSchema.optional()), orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteScalarFieldEnumSchema, QuoteScalarFieldEnumSchema.array()]).optional() }).strict();