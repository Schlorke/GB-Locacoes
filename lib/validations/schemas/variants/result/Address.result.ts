import { z } from 'zod';

// prettier-ignore
export const AddressResultSchema = z.object({
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

export type AddressResultType = z.infer<typeof AddressResultSchema>;
