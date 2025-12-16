/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const QuoteScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'phone', 'company', 'message', 'total', 'status', 'userId', 'createdAt', 'updatedAt', 'cep', 'cnpj', 'cpf', 'adminNotes', 'approvedAt', 'approvedBy', 'convertedToRentalId', 'deliveryAddress', 'deliveryFee', 'deliveryType', 'deposit', 'discount', 'endDate', 'finalTotal', 'internalNotes', 'pickupFee', 'priority', 'rejectedAt', 'rejectedBy', 'rejectionReason', 'startDate', 'subtotal', 'taxes', 'validUntil'])

export type QuoteScalarFieldEnum = z.infer<typeof QuoteScalarFieldEnumSchema>;