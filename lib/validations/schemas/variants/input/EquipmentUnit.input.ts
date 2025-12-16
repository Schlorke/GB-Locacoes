/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { EquipmentUnitStatusSchema } from '../../enums/EquipmentUnitStatus.schema';
// prettier-ignore
export const EquipmentUnitInputSchema = z.object({
    id: z.string(),
    equipmentId: z.string(),
    uniqueCode: z.string(),
    status: EquipmentUnitStatusSchema,
    hourMeter: z.number().optional().nullable(),
    odometer: z.number().optional().nullable(),
    serialNumber: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    equipment: z.unknown()
}).strict();

export type EquipmentUnitInputType = z.infer<typeof EquipmentUnitInputSchema>;
