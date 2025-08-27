import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'password', 'role', 'emailVerified', 'image', 'createdAt', 'updatedAt'])