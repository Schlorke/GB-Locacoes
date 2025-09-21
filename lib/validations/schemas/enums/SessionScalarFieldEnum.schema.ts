import { z } from 'zod';

export const SessionScalarFieldEnumSchema = z.enum(['id', 'sessionToken', 'userId', 'expires'])

export type SessionScalarFieldEnum = z.infer<typeof SessionScalarFieldEnumSchema>;