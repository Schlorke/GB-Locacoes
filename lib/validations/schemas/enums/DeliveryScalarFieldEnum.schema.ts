/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const DeliveryScalarFieldEnumSchema = z.enum(['id', 'rentalId', 'type', 'status', 'scheduledAt', 'completedAt', 'address', 'distance', 'vehicleId', 'driverId', 'driverName', 'photos', 'checklist', 'notes', 'createdAt', 'updatedAt'])

export type DeliveryScalarFieldEnum = z.infer<typeof DeliveryScalarFieldEnumSchema>;