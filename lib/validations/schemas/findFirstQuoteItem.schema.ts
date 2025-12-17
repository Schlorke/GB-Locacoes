import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemOrderByWithRelationInputObjectSchema as QuoteItemOrderByWithRelationInputObjectSchema } from './objects/QuoteItemOrderByWithRelationInput.schema';
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';
import { QuoteItemScalarFieldEnumSchema } from './enums/QuoteItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const QuoteItemFindFirstSelectSchema: z.ZodType<Prisma.QuoteItemSelect> = z.object({
    id: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    total: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    includeWeekends: z.boolean().optional(),
    appliedDiscount: z.boolean().optional(),
    appliedPeriod: z.boolean().optional(),
    useDirectValue: z.boolean().optional(),
    directValue: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quote: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.QuoteItemSelect>;

export const QuoteItemFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    total: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    includeWeekends: z.boolean().optional(),
    appliedDiscount: z.boolean().optional(),
    appliedPeriod: z.boolean().optional(),
    useDirectValue: z.boolean().optional(),
    directValue: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quote: z.boolean().optional()
  }).strict();

export const QuoteItemFindFirstSchema: z.ZodType<Prisma.QuoteItemFindFirstArgs> = z.object({ select: QuoteItemFindFirstSelectSchema.optional(), include: z.lazy(() => QuoteItemIncludeObjectSchema.optional()), orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteItemScalarFieldEnumSchema, QuoteItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.QuoteItemFindFirstArgs>;

export const QuoteItemFindFirstZodSchema = z.object({ select: QuoteItemFindFirstSelectSchema.optional(), include: z.lazy(() => QuoteItemIncludeObjectSchema.optional()), orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteItemScalarFieldEnumSchema, QuoteItemScalarFieldEnumSchema.array()]).optional() }).strict();