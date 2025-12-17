import * as z from 'zod';

export const MaintenanceTypeSchema = z.enum(['PREVENTIVE', 'CORRECTIVE', 'INSPECTION'])

export type MaintenanceType = z.infer<typeof MaintenanceTypeSchema>;