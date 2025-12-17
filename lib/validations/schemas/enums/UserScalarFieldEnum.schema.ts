import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'password', 'role', 'emailVerified', 'image', 'createdAt', 'updatedAt', 'cnpj', 'cpf', 'phone'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;