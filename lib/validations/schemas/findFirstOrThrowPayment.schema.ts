/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentOrderByWithRelationInputObjectSchema as PaymentOrderByWithRelationInputObjectSchema } from './objects/PaymentOrderByWithRelationInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentScalarFieldEnumSchema } from './enums/PaymentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PaymentFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PaymentSelect> = z.object({
    id: z.boolean().optional(),
    rentalId: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    amount: z.boolean().optional(),
    method: z.boolean().optional(),
    status: z.boolean().optional(),
    type: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    invoiceNumber: z.boolean().optional(),
    transactionId: z.boolean().optional(),
    pixCode: z.boolean().optional(),
    pixQrCode: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    quote: z.boolean().optional(),
    rental: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PaymentSelect>;

export const PaymentFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    rentalId: z.boolean().optional(),
    quoteId: z.boolean().optional(),
    amount: z.boolean().optional(),
    method: z.boolean().optional(),
    status: z.boolean().optional(),
    type: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    invoiceNumber: z.boolean().optional(),
    transactionId: z.boolean().optional(),
    pixCode: z.boolean().optional(),
    pixQrCode: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    quote: z.boolean().optional(),
    rental: z.boolean().optional()
  }).strict();

export const PaymentFindFirstOrThrowSchema: z.ZodType<Prisma.PaymentFindFirstOrThrowArgs> = z.object({ select: PaymentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PaymentIncludeObjectSchema.optional()), orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PaymentScalarFieldEnumSchema, PaymentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PaymentFindFirstOrThrowArgs>;

export const PaymentFindFirstOrThrowZodSchema = z.object({ select: PaymentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PaymentIncludeObjectSchema.optional()), orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PaymentScalarFieldEnumSchema, PaymentScalarFieldEnumSchema.array()]).optional() }).strict();