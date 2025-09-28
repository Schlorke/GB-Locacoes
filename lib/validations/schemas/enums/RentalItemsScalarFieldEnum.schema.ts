/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const RentalItemsScalarFieldEnumSchema = z.enum(['id', 'rentalid', 'equipmentid', 'quantity', 'priceperday', 'totaldays', 'totalprice', 'createdat', 'updatedat'])

export type RentalItemsScalarFieldEnum = z.infer<typeof RentalItemsScalarFieldEnumSchema>;