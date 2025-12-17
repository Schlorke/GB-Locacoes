import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogSelectObjectSchema as AuditLogSelectObjectSchema } from './objects/AuditLogSelect.schema';
import { AuditLogIncludeObjectSchema as AuditLogIncludeObjectSchema } from './objects/AuditLogInclude.schema';
import { AuditLogUpdateInputObjectSchema as AuditLogUpdateInputObjectSchema } from './objects/AuditLogUpdateInput.schema';
import { AuditLogUncheckedUpdateInputObjectSchema as AuditLogUncheckedUpdateInputObjectSchema } from './objects/AuditLogUncheckedUpdateInput.schema';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './objects/AuditLogWhereUniqueInput.schema';

export const AuditLogUpdateOneSchema: z.ZodType<Prisma.AuditLogUpdateArgs> = z.object({ select: AuditLogSelectObjectSchema.optional(), include: AuditLogIncludeObjectSchema.optional(), data: z.union([AuditLogUpdateInputObjectSchema, AuditLogUncheckedUpdateInputObjectSchema]), where: AuditLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AuditLogUpdateArgs>;

export const AuditLogUpdateOneZodSchema = z.object({ select: AuditLogSelectObjectSchema.optional(), include: AuditLogIncludeObjectSchema.optional(), data: z.union([AuditLogUpdateInputObjectSchema, AuditLogUncheckedUpdateInputObjectSchema]), where: AuditLogWhereUniqueInputObjectSchema }).strict();