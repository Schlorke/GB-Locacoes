/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const AuditLogResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    action: z.string(),
    entity: z.string(),
    entityId: z.string(),
    changes: z.unknown().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date(),
    user: z.unknown().nullable()
}).strict();

export type AuditLogResultType = z.infer<typeof AuditLogResultSchema>;
