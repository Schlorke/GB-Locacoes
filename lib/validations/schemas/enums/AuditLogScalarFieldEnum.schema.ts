/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const AuditLogScalarFieldEnumSchema = z.enum(['id', 'userId', 'action', 'entity', 'entityId', 'changes', 'ipAddress', 'userAgent', 'createdAt'])

export type AuditLogScalarFieldEnum = z.infer<typeof AuditLogScalarFieldEnumSchema>;