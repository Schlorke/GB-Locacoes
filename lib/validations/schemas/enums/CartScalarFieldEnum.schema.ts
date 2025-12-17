/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const CartScalarFieldEnumSchema = z.enum(['id', 'userId', 'createdAt', 'updatedAt'])

export type CartScalarFieldEnum = z.infer<typeof CartScalarFieldEnumSchema>;