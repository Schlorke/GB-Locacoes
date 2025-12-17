import * as z from 'zod';

export const QuoteItemScalarFieldEnumSchema = z.enum(['id', 'quoteId', 'equipmentId', 'quantity', 'days', 'pricePerDay', 'total', 'startDate', 'endDate', 'includeWeekends', 'appliedDiscount', 'appliedPeriod', 'useDirectValue', 'directValue', 'createdAt', 'updatedAt'])

export type QuoteItemScalarFieldEnum = z.infer<typeof QuoteItemScalarFieldEnumSchema>;