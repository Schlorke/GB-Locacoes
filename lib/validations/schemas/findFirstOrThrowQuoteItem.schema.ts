import { Prisma } from '../../../node_modules/.prisma/client';
import { z } from 'zod';
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemOrderByWithRelationInputObjectSchema } from './objects/QuoteItemOrderByWithRelationInput.schema';
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';
import { QuoteItemScalarFieldEnumSchema } from './enums/QuoteItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const QuoteItemFindFirstOrThrowSelectSchema: z.ZodType<Prisma.QuoteItemSelect> = z.object({
    id: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    total: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quote: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.QuoteItemSelect>;

export const QuoteItemFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    days: z.boolean().optional(),
    pricePerDay: z.boolean().optional(),
    total: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional(),
    quote: z.boolean().optional()
  }).strict();

export const QuoteItemFindFirstOrThrowSchema: z.ZodType<Prisma.QuoteItemFindFirstOrThrowArgs> = z.object({ select: QuoteItemFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => QuoteItemIncludeObjectSchema.optional()), orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.QuoteItemScalarFieldEnum), z.nativeEnum(Prisma.QuoteItemScalarFieldEnum).array()]).optional() }).strict() as unknown as z.ZodType<Prisma.QuoteItemFindFirstOrThrowArgs>;

export const QuoteItemFindFirstOrThrowZodSchema = z.object({ select: QuoteItemFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => QuoteItemIncludeObjectSchema.optional()), orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.QuoteItemScalarFieldEnum), z.nativeEnum(Prisma.QuoteItemScalarFieldEnum).array()]).optional() }).strict();