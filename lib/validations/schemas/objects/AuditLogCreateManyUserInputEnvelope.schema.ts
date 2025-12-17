/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogCreateManyUserInputObjectSchema as AuditLogCreateManyUserInputObjectSchema } from './AuditLogCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AuditLogCreateManyUserInputObjectSchema), z.lazy(() => AuditLogCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AuditLogCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AuditLogCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateManyUserInputEnvelope>;
export const AuditLogCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
