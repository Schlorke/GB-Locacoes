/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  action: z.string(),
  entity: z.string(),
  entityId: z.string(),
  changes: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AuditLogCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateWithoutUserInput>;
export const AuditLogCreateWithoutUserInputObjectZodSchema = makeSchema();
