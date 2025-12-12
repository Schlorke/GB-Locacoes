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

export const QuoteFindFirstSelectSchema: z.ZodType<Prisma.QuoteSelect> = z.object({
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
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    validUntil: z.boolean().optional(),
    deliveryType: z.boolean().optional(),
    deliveryAddress: z.boolean().optional(),
    deliveryFee: z.boolean().optional(),
    pickupFee: z.boolean().optional(),
    deposit: z.boolean().optional(),
    subtotal: z.boolean().optional(),
    taxes: z.boolean().optional(),
    discount: z.boolean().optional(),
    finalTotal: z.boolean().optional(),
    priority: z.boolean().optional(),
    internalNotes: z.boolean().optional(),
    adminNotes: z.boolean().optional(),
    rejectionReason: z.boolean().optional(),
    approvedAt: z.boolean().optional(),
    approvedBy: z.boolean().optional(),
    rejectedAt: z.boolean().optional(),
    rejectedBy: z.boolean().optional(),
    convertedToRentalId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    items: z.boolean().optional(),
    user: z.boolean().optional(),
    approvedByUser: z.boolean().optional(),
    rejectedByUser: z.boolean().optional(),
    payments: z.boolean().optional(),
    rentals: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.QuoteSelect>;

export const QuoteFindFirstSelectZodSchema = z.object({
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
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    validUntil: z.boolean().optional(),
    deliveryType: z.boolean().optional(),
    deliveryAddress: z.boolean().optional(),
    deliveryFee: z.boolean().optional(),
    pickupFee: z.boolean().optional(),
    deposit: z.boolean().optional(),
    subtotal: z.boolean().optional(),
    taxes: z.boolean().optional(),
    discount: z.boolean().optional(),
    finalTotal: z.boolean().optional(),
    priority: z.boolean().optional(),
    internalNotes: z.boolean().optional(),
    adminNotes: z.boolean().optional(),
    rejectionReason: z.boolean().optional(),
    approvedAt: z.boolean().optional(),
    approvedBy: z.boolean().optional(),
    rejectedAt: z.boolean().optional(),
    rejectedBy: z.boolean().optional(),
    convertedToRentalId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    items: z.boolean().optional(),
    user: z.boolean().optional(),
    approvedByUser: z.boolean().optional(),
    rejectedByUser: z.boolean().optional(),
    payments: z.boolean().optional(),
    rentals: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const QuoteFindFirstSchema: z.ZodType<Prisma.QuoteFindFirstArgs> = z.object({ select: QuoteFindFirstSelectSchema.optional(), include: z.lazy(() => QuoteIncludeObjectSchema.optional()), orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteScalarFieldEnumSchema, QuoteScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.QuoteFindFirstArgs>;

export const QuoteFindFirstZodSchema = z.object({ select: QuoteFindFirstSelectSchema.optional(), include: z.lazy(() => QuoteIncludeObjectSchema.optional()), orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([QuoteScalarFieldEnumSchema, QuoteScalarFieldEnumSchema.array()]).optional() }).strict();