/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const QuoteItemScalarFieldEnumSchema = z.enum(['id', 'quoteId', 'equipmentId', 'quantity', 'days', 'pricePerDay', 'total', 'createdAt', 'updatedAt'])

export type QuoteItemScalarFieldEnum = z.infer<typeof QuoteItemScalarFieldEnumSchema>;