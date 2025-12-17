import * as z from 'zod';
import { EquipmentUnitStatusSchema } from '../../enums/EquipmentUnitStatus.schema';
// prettier-ignore
export const EquipmentUnitModelSchema = z.object({
    id: z.string(),
    equipmentId: z.string(),
    uniqueCode: z.string(),
    status: EquipmentUnitStatusSchema,
    hourMeter: z.number().nullable(),
    odometer: z.number().nullable(),
    serialNumber: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    equipment: z.unknown()
}).strict();

export type EquipmentUnitPureType = z.infer<typeof EquipmentUnitModelSchema>;
