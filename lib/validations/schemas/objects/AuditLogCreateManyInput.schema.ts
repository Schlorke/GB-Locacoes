import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  action: z.string(),
  entity: z.string(),
  entityId: z.string(),
  changes: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AuditLogCreateManyInputObjectSchema: z.ZodType<Prisma.AuditLogCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateManyInput>;
export const AuditLogCreateManyInputObjectZodSchema = makeSchema();
