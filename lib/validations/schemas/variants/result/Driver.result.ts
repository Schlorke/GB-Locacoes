import * as z from 'zod';
import { DriverStatusSchema } from '../../enums/DriverStatus.schema';
// prettier-ignore
export const DriverResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    cnh: z.string().nullable(),
    cnhCategory: z.string().nullable(),
    status: DriverStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DriverResultType = z.infer<typeof DriverResultSchema>;
