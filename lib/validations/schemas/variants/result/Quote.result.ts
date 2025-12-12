/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { QuoteStatusSchema } from '../../enums/QuoteStatus.schema';
import { DeliveryTypeSchema } from '../../enums/DeliveryType.schema';
// prettier-ignore
export const QuoteResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    cpf: z.string().nullable(),
    cnpj: z.string().nullable(),
    cep: z.string().nullable(),
    company: z.string().nullable(),
    message: z.string().nullable(),
    total: z.number(),
    status: QuoteStatusSchema,
    userId: z.string().nullable(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    validUntil: z.date().nullable(),
    deliveryType: DeliveryTypeSchema.nullable(),
    deliveryAddress: z.unknown().nullable(),
    deliveryFee: z.number().nullable(),
    pickupFee: z.number().nullable(),
    deposit: z.number().nullable(),
    subtotal: z.number().nullable(),
    taxes: z.number().nullable(),
    discount: z.number().nullable(),
    finalTotal: z.number().nullable(),
    priority: z.number().int().nullable(),
    internalNotes: z.string().nullable(),
    adminNotes: z.string().nullable(),
    rejectionReason: z.string().nullable(),
    approvedAt: z.date().nullable(),
    approvedBy: z.string().nullable(),
    rejectedAt: z.date().nullable(),
    rejectedBy: z.string().nullable(),
    convertedToRentalId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.unknown()),
    user: z.unknown().nullable(),
    approvedByUser: z.unknown().nullable(),
    rejectedByUser: z.unknown().nullable(),
    payments: z.array(z.unknown()),
    rentals: z.array(z.unknown())
}).strict();

export type QuoteResultType = z.infer<typeof QuoteResultSchema>;
