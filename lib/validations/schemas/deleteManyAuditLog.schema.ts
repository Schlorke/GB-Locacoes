import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';

export const AuditLogDeleteManySchema: z.ZodType<Prisma.AuditLogDeleteManyArgs> = z.object({ where: AuditLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogDeleteManyArgs>;

export const AuditLogDeleteManyZodSchema = z.object({ where: AuditLogWhereInputObjectSchema.optional() }).strict();