/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const EquipmentUnitScalarFieldEnumSchema = z.enum(['id', 'equipmentId', 'uniqueCode', 'status', 'hourMeter', 'odometer', 'serialNumber', 'notes', 'createdAt', 'updatedAt'])

export type EquipmentUnitScalarFieldEnum = z.infer<typeof EquipmentUnitScalarFieldEnumSchema>;