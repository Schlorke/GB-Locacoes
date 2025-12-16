/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { MaintenanceTypeSchema } from '../../enums/MaintenanceType.schema';
import { MaintenanceStatusSchema } from '../../enums/MaintenanceStatus.schema';
// prettier-ignore
export const MaintenanceModelSchema = z.object({
    id: z.string(),
    equipmentId: z.string(),
    type: MaintenanceTypeSchema,
    scheduledAt: z.date(),
    completedAt: z.date().nullable(),
    cost: z.number().nullable(),
    laborCost: z.number().nullable(),
    partsCost: z.number().nullable(),
    description: z.string().nullable(),
    notes: z.string().nullable(),
    technician: z.string().nullable(),
    status: MaintenanceStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    equipment: z.unknown()
}).strict();

export type MaintenancePureType = z.infer<typeof MaintenanceModelSchema>;
