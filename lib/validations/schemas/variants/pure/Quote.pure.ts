/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { QuoteStatusSchema } from '../../enums/QuoteStatus.schema';
import { DeliveryTypeSchema } from '../../enums/DeliveryType.schema';
// prettier-ignore
export const QuoteModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().nullable(),
    message: z.string().nullable(),
    total: z.number(),
    status: QuoteStatusSchema,
    userId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    cep: z.string().nullable(),
    cnpj: z.string().nullable(),
    cpf: z.string().nullable(),
    adminNotes: z.string().nullable(),
    approvedAt: z.date().nullable(),
    approvedBy: z.string().nullable(),
    convertedToRentalId: z.string().nullable(),
    deliveryAddress: z.unknown().nullable(),
    deliveryFee: z.number().nullable(),
    deliveryType: DeliveryTypeSchema.nullable(),
    deposit: z.number().nullable(),
    discount: z.number().nullable(),
    endDate: z.date().nullable(),
    finalTotal: z.number().nullable(),
    internalNotes: z.string().nullable(),
    pickupFee: z.number().nullable(),
    priority: z.number().int().nullable(),
    rejectedAt: z.date().nullable(),
    rejectedBy: z.string().nullable(),
    rejectionReason: z.string().nullable(),
    startDate: z.date().nullable(),
    subtotal: z.number().nullable(),
    taxes: z.number().nullable(),
    validUntil: z.date().nullable(),
    payments: z.array(z.unknown()),
    items: z.array(z.unknown()),
    approvedByUser: z.unknown().nullable(),
    rejectedByUser: z.unknown().nullable(),
    user: z.unknown().nullable(),
    rentals: z.array(z.unknown())
}).strict();

export type QuotePureType = z.infer<typeof QuoteModelSchema>;
