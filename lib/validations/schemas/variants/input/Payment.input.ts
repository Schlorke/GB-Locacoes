/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { PaymentMethodSchema } from '../../enums/PaymentMethod.schema';
import { PaymentStatusSchema } from '../../enums/PaymentStatus.schema';
import { PaymentTypeSchema } from '../../enums/PaymentType.schema';
// prettier-ignore
export const PaymentInputSchema = z.object({
    id: z.string(),
    rentalId: z.string().optional().nullable(),
    quoteId: z.string().optional().nullable(),
    amount: z.number(),
    method: PaymentMethodSchema,
    status: PaymentStatusSchema,
    type: PaymentTypeSchema,
    paidAt: z.date().optional().nullable(),
    dueDate: z.date(),
    invoiceNumber: z.string().optional().nullable(),
    transactionId: z.string().optional().nullable(),
    pixCode: z.string().optional().nullable(),
    pixQrCode: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    quote: z.unknown().optional().nullable(),
    rental: z.unknown().optional().nullable()
}).strict();

export type PaymentInputType = z.infer<typeof PaymentInputSchema>;
