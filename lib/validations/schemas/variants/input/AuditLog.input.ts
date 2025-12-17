import * as z from 'zod';
// prettier-ignore
export const AuditLogInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    action: z.string(),
    entity: z.string(),
    entityId: z.string(),
    changes: z.unknown().optional().nullable(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    createdAt: z.date(),
    user: z.unknown().optional().nullable()
}).strict();

export type AuditLogInputType = z.infer<typeof AuditLogInputSchema>;
