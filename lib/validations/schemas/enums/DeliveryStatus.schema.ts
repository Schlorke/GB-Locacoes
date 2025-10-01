/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const DeliveryStatusSchema = z.enum(['SCHEDULED', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED', 'FAILED'])

export type DeliveryStatus = z.infer<typeof DeliveryStatusSchema>;