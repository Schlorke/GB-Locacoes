/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const MaintenanceTypeSchema = z.enum(['PREVENTIVE', 'CORRECTIVE', 'INSPECTION'])

export type MaintenanceType = z.infer<typeof MaintenanceTypeSchema>;