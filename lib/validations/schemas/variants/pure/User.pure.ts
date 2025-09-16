import { z } from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    password: z.string().nullable(),
    role: RoleSchema,
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    accounts: z.array(z.unknown()),
    quotes: z.array(z.unknown()),
    rentals: z.array(z.unknown()),
    sessions: z.array(z.unknown())
}).strict();

export type UserModelType = z.infer<typeof UserModelSchema>;
