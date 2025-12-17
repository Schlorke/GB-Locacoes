import * as z from 'zod';
export const AuditLogUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  action: z.string(),
  entity: z.string(),
  entityId: z.string(),
  changes: z.unknown().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  createdAt: z.date(),
  user: z.unknown().optional()
}));