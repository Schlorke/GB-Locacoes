/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { PaymentMethodSchema } from '../../enums/PaymentMethod.schema';
import { PaymentStatusSchema } from '../../enums/PaymentStatus.schema';
import { PaymentTypeSchema } from '../../enums/PaymentType.schema';
// prettier-ignore
export const PaymentResultSchema = z.object({
    id: z.string(),
    rentalId: z.string().nullable(),
    quoteId: z.string().nullable(),
    amount: z.number(),
    method: PaymentMethodSchema,
    status: PaymentStatusSchema,
    type: PaymentTypeSchema,
    paidAt: z.date().nullable(),
    dueDate: z.date(),
    invoiceNumber: z.string().nullable(),
    transactionId: z.string().nullable(),
    pixCode: z.string().nullable(),
    pixQrCode: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    quote: z.unknown().nullable(),
    rental: z.unknown().nullable()
}).strict();

export type PaymentResultType = z.infer<typeof PaymentResultSchema>;
