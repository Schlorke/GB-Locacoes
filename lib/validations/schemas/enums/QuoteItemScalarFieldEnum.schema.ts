import { z } from 'zod';

export const QuoteItemScalarFieldEnumSchema = z.enum(['id', 'quoteId', 'equipmentId', 'quantity', 'days', 'pricePerDay', 'total', 'createdAt', 'updatedAt'])

export type QuoteItemScalarFieldEnum = z.infer<typeof QuoteItemScalarFieldEnumSchema>;