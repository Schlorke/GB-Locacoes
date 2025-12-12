/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const MaintenanceScalarFieldEnumSchema = z.enum(['id', 'equipmentId', 'type', 'scheduledAt', 'completedAt', 'cost', 'laborCost', 'partsCost', 'description', 'notes', 'technician', 'status', 'createdAt', 'updatedAt'])

export type MaintenanceScalarFieldEnum = z.infer<typeof MaintenanceScalarFieldEnumSchema>;