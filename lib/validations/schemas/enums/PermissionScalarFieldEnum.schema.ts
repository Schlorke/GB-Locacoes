/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const PermissionScalarFieldEnumSchema = z.enum(['id', 'role', 'module', 'action', 'createdAt', 'updatedAt'])

export type PermissionScalarFieldEnum = z.infer<typeof PermissionScalarFieldEnumSchema>;