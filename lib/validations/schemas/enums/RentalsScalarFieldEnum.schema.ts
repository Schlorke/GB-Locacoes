import * as z from 'zod';

export const RentalsScalarFieldEnumSchema = z.enum(['id', 'startdate', 'enddate', 'total', 'status', 'userid', 'createdat', 'updatedat'])

export type RentalsScalarFieldEnum = z.infer<typeof RentalsScalarFieldEnumSchema>;