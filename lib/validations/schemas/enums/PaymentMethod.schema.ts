import * as z from 'zod';

export const PaymentMethodSchema = z.enum(['PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'CASH', 'BOLETO'])

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;