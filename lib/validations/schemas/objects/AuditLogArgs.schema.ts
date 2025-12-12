/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogSelectObjectSchema as AuditLogSelectObjectSchema } from './AuditLogSelect.schema';
import { AuditLogIncludeObjectSchema as AuditLogIncludeObjectSchema } from './AuditLogInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AuditLogSelectObjectSchema).optional(),
  include: z.lazy(() => AuditLogIncludeObjectSchema).optional()
}).strict();
export const AuditLogArgsObjectSchema = makeSchema();
export const AuditLogArgsObjectZodSchema = makeSchema();
