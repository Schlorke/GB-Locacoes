/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const AuditLogModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    action: z.string(),
    entity: z.string(),
    entityId: z.string(),
    changes: z.unknown().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date()
}).strict();

export type AuditLogPureType = z.infer<typeof AuditLogModelSchema>;
