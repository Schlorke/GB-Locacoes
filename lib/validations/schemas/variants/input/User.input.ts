import { z } from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    name: z.string().optional().nullable(),
    email: z.string(),
    password: z.string().optional().nullable(),
    role: RoleSchema,
    emailVerified: z.date().optional().nullable(),
    image: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    accounts: z.array(z.unknown()),
    quotes: z.array(z.unknown()),
    rentals: z.array(z.unknown()),
    sessions: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
