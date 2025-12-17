import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './AuditLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuditLogWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAuditLogsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAuditLogsArgsObjectZodSchema = makeSchema();
