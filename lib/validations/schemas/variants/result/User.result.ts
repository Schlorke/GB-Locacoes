import { z } from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    password: z.string().nullable(),
    phone: z.string().nullable(),
    cpf: z.string().nullable(),
    cnpj: z.string().nullable(),
    role: RoleSchema,
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    accounts: z.array(z.unknown()).array(),
    quotes: z.array(z.unknown()).array(),
    rentals: z.array(z.unknown()).array(),
    sessions: z.array(z.unknown()).array(),
    addresses: z.array(z.unknown()).array(),
    cart: z.unknown().nullable()
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
