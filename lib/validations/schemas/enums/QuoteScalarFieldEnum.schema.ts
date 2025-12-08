/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const QuoteScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'phone', 'cpf', 'cnpj', 'cep', 'company', 'message', 'total', 'status', 'userId', 'startDate', 'endDate', 'validUntil', 'deliveryType', 'deliveryAddress', 'deliveryFee', 'pickupFee', 'deposit', 'subtotal', 'taxes', 'discount', 'finalTotal', 'priority', 'internalNotes', 'adminNotes', 'rejectionReason', 'approvedAt', 'approvedBy', 'rejectedAt', 'rejectedBy', 'convertedToRentalId', 'createdAt', 'updatedAt'])

export type QuoteScalarFieldEnum = z.infer<typeof QuoteScalarFieldEnumSchema>;