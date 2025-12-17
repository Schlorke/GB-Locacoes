import * as z from 'zod';
import { VehicleTypeSchema } from '../../enums/VehicleType.schema';
import { VehicleStatusSchema } from '../../enums/VehicleStatus.schema';
// prettier-ignore
export const VehicleResultSchema = z.object({
    id: z.string(),
    plate: z.string(),
    brand: z.string().nullable(),
    model: z.string().nullable(),
    year: z.number().int().nullable(),
    type: VehicleTypeSchema,
    status: VehicleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type VehicleResultType = z.infer<typeof VehicleResultSchema>;
