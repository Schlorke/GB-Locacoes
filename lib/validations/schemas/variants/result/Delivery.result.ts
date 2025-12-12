/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { DeliveryTypeSchema } from '../../enums/DeliveryType.schema';
import { DeliveryStatusSchema } from '../../enums/DeliveryStatus.schema';
// prettier-ignore
export const DeliveryResultSchema = z.object({
    id: z.string(),
    rentalId: z.string(),
    rental: z.unknown(),
    type: DeliveryTypeSchema,
    status: DeliveryStatusSchema,
    scheduledAt: z.date(),
    completedAt: z.date().nullable(),
    address: z.unknown(),
    distance: z.number().nullable(),
    vehicleId: z.string().nullable(),
    driverId: z.string().nullable(),
    driverName: z.string().nullable(),
    photos: z.array(z.string()),
    checklist: z.unknown().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DeliveryResultType = z.infer<typeof DeliveryResultSchema>;
