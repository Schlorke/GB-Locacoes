import * as z from 'zod';
import { MaintenanceTypeSchema } from '../../enums/MaintenanceType.schema';
import { MaintenanceStatusSchema } from '../../enums/MaintenanceStatus.schema';
// prettier-ignore
export const MaintenanceInputSchema = z.object({
    id: z.string(),
    equipmentId: z.string(),
    type: MaintenanceTypeSchema,
    scheduledAt: z.date(),
    completedAt: z.date().optional().nullable(),
    cost: z.number().optional().nullable(),
    laborCost: z.number().optional().nullable(),
    partsCost: z.number().optional().nullable(),
    description: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    technician: z.string().optional().nullable(),
    status: MaintenanceStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    equipment: z.unknown()
}).strict();

export type MaintenanceInputType = z.infer<typeof MaintenanceInputSchema>;
