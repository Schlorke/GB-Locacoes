import * as z from 'zod';

export const PaymentScalarFieldEnumSchema = z.enum(['id', 'rentalId', 'quoteId', 'amount', 'method', 'status', 'type', 'paidAt', 'dueDate', 'invoiceNumber', 'transactionId', 'pixCode', 'pixQrCode', 'metadata', 'createdAt', 'updatedAt'])

export type PaymentScalarFieldEnum = z.infer<typeof PaymentScalarFieldEnumSchema>;