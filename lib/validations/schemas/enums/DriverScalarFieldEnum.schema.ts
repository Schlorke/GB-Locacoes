import * as z from 'zod';

export const DriverScalarFieldEnumSchema = z.enum(['id', 'name', 'phone', 'cnh', 'cnhCategory', 'status', 'createdAt', 'updatedAt'])

export type DriverScalarFieldEnum = z.infer<typeof DriverScalarFieldEnumSchema>;