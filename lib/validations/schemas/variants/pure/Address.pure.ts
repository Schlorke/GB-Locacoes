/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

// prettier-ignore
export const AddressModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    street: z.string(),
    number: z.string(),
    complement: z.string().nullable(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    isPrimary: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AddressModelType = z.infer<typeof AddressModelSchema>;
