/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const EquipmentUnitStatusSchema = z.enum(['AVAILABLE', 'RESERVED', 'RENTED', 'MAINTENANCE', 'RETIRED'])

export type EquipmentUnitStatus = z.infer<typeof EquipmentUnitStatusSchema>;