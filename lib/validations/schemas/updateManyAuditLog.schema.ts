/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogUpdateManyMutationInputObjectSchema as AuditLogUpdateManyMutationInputObjectSchema } from './objects/AuditLogUpdateManyMutationInput.schema';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';

export const AuditLogUpdateManySchema: z.ZodType<Prisma.AuditLogUpdateManyArgs> = z.object({ data: AuditLogUpdateManyMutationInputObjectSchema, where: AuditLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogUpdateManyArgs>;

export const AuditLogUpdateManyZodSchema = z.object({ data: AuditLogUpdateManyMutationInputObjectSchema, where: AuditLogWhereInputObjectSchema.optional() }).strict();