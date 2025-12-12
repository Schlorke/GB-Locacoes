/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { DriverStatusSchema } from '../../enums/DriverStatus.schema';
// prettier-ignore
export const DriverInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    cnh: z.string().optional().nullable(),
    cnhCategory: z.string().optional().nullable(),
    status: DriverStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DriverInputType = z.infer<typeof DriverInputSchema>;
