import * as z from 'zod';
import { DriverStatusSchema } from '../../enums/DriverStatus.schema';
// prettier-ignore
export const DriverModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    cnh: z.string().nullable(),
    cnhCategory: z.string().nullable(),
    status: DriverStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DriverPureType = z.infer<typeof DriverModelSchema>;
