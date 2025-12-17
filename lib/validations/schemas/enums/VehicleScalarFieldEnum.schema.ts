import * as z from 'zod';

export const VehicleScalarFieldEnumSchema = z.enum(['id', 'plate', 'brand', 'model', 'year', 'type', 'status', 'createdAt', 'updatedAt'])

export type VehicleScalarFieldEnum = z.infer<typeof VehicleScalarFieldEnumSchema>;