/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  action: z.boolean().optional(),
  entity: z.boolean().optional(),
  entityId: z.boolean().optional(),
  changes: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const AuditLogSelectObjectSchema: z.ZodType<Prisma.AuditLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogSelect>;
export const AuditLogSelectObjectZodSchema = makeSchema();
