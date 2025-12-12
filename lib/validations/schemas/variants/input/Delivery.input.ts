/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { DeliveryTypeSchema } from '../../enums/DeliveryType.schema';
import { DeliveryStatusSchema } from '../../enums/DeliveryStatus.schema';
// prettier-ignore
export const DeliveryInputSchema = z.object({
    id: z.string(),
    rentalId: z.string(),
    rental: z.unknown(),
    type: DeliveryTypeSchema,
    status: DeliveryStatusSchema,
    scheduledAt: z.date(),
    completedAt: z.date().optional().nullable(),
    address: z.unknown(),
    distance: z.number().optional().nullable(),
    vehicleId: z.string().optional().nullable(),
    driverId: z.string().optional().nullable(),
    driverName: z.string().optional().nullable(),
    photos: z.array(z.string()),
    checklist: z.unknown().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DeliveryInputType = z.infer<typeof DeliveryInputSchema>;
