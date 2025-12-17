import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  action: z.literal(true).optional(),
  entity: z.literal(true).optional(),
  entityId: z.literal(true).optional(),
  ipAddress: z.literal(true).optional(),
  userAgent: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const AuditLogMaxAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogMaxAggregateInputType>;
export const AuditLogMaxAggregateInputObjectZodSchema = makeSchema();
