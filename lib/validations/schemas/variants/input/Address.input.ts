/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const AddressInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    street: z.string(),
    number: z.string(),
    complement: z.string().optional().nullable(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    isPrimary: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AddressInputType = z.infer<typeof AddressInputSchema>;
