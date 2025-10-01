/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier', 'token', 'expires'])

export type VerificationTokenScalarFieldEnum = z.infer<typeof VerificationTokenScalarFieldEnumSchema>;