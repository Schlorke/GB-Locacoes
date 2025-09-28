/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const QuoteScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'phone', 'company', 'message', 'total', 'status', 'userId', 'createdAt', 'updatedAt'])

export type QuoteScalarFieldEnum = z.infer<typeof QuoteScalarFieldEnumSchema>;