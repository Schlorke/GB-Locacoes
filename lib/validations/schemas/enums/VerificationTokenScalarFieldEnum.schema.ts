import { z } from 'zod';

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier', 'token', 'expires'])

export type VerificationTokenScalarFieldEnum = z.infer<typeof VerificationTokenScalarFieldEnumSchema>;