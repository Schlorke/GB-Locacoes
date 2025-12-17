/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { VehicleTypeSchema } from '../../enums/VehicleType.schema';
import { VehicleStatusSchema } from '../../enums/VehicleStatus.schema';
// prettier-ignore
export const VehicleInputSchema = z.object({
    id: z.string(),
    plate: z.string(),
    brand: z.string().optional().nullable(),
    model: z.string().optional().nullable(),
    year: z.number().int().optional().nullable(),
    type: VehicleTypeSchema,
    status: VehicleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type VehicleInputType = z.infer<typeof VehicleInputSchema>;
