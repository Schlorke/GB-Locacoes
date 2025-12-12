/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const VehicleTypeSchema = z.enum(['TRUCK', 'VAN', 'PICKUP', 'MOTORCYCLE'])

export type VehicleType = z.infer<typeof VehicleTypeSchema>;