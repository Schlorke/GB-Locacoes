/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { QuoteStatusSchema } from '../../enums/QuoteStatus.schema';
import { DeliveryTypeSchema } from '../../enums/DeliveryType.schema';
// prettier-ignore
export const QuoteInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    cpf: z.string().optional().nullable(),
    cnpj: z.string().optional().nullable(),
    cep: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
    total: z.number(),
    status: QuoteStatusSchema,
    userId: z.string().optional().nullable(),
    startDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable(),
    validUntil: z.date().optional().nullable(),
    deliveryType: DeliveryTypeSchema.optional().nullable(),
    deliveryAddress: z.unknown().optional().nullable(),
    deliveryFee: z.number().optional().nullable(),
    pickupFee: z.number().optional().nullable(),
    deposit: z.number().optional().nullable(),
    subtotal: z.number().optional().nullable(),
    taxes: z.number().optional().nullable(),
    discount: z.number().optional().nullable(),
    finalTotal: z.number().optional().nullable(),
    priority: z.number().int().optional().nullable(),
    internalNotes: z.string().optional().nullable(),
    adminNotes: z.string().optional().nullable(),
    rejectionReason: z.string().optional().nullable(),
    approvedAt: z.date().optional().nullable(),
    approvedBy: z.string().optional().nullable(),
    rejectedAt: z.date().optional().nullable(),
    rejectedBy: z.string().optional().nullable(),
    convertedToRentalId: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.unknown()),
    user: z.unknown().optional().nullable(),
    approvedByUser: z.unknown().optional().nullable(),
    rejectedByUser: z.unknown().optional().nullable(),
    payments: z.array(z.unknown()),
    rentals: z.array(z.unknown())
}).strict();

export type QuoteInputType = z.infer<typeof QuoteInputSchema>;
