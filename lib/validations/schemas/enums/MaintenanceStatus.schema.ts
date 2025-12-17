import * as z from 'zod';

export const MaintenanceStatusSchema = z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])

export type MaintenanceStatus = z.infer<typeof MaintenanceStatusSchema>;