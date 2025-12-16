/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const RentalsScalarFieldEnumSchema = z.enum(['id', 'startdate', 'enddate', 'total', 'status', 'userid', 'createdat', 'updatedat', 'checkInAt', 'checkOutAt', 'extensionDays', 'extensionFee', 'lateFee', 'notes', 'quoteId'])

export type RentalsScalarFieldEnum = z.infer<typeof RentalsScalarFieldEnumSchema>;