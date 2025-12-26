/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    password: z.string().nullable(),
    role: RoleSchema,
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    cnpj: z.string().nullable(),
    cpf: z.string().nullable(),
    phone: z.string().nullable(),
    accounts: z.array(z.unknown()),
    addresses: z.array(z.unknown()),
    auditLogs: z.array(z.unknown()),
    cart: z.unknown().nullable(),
    approvedQuotes: z.array(z.unknown()),
    rejectedQuotes: z.array(z.unknown()),
    quotes: z.array(z.unknown()),
    rentals: z.array(z.unknown()),
    sessions: z.array(z.unknown()),
    notifications: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
