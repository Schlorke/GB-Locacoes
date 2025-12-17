import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogSelectObjectSchema as AuditLogSelectObjectSchema } from './objects/AuditLogSelect.schema';
import { AuditLogIncludeObjectSchema as AuditLogIncludeObjectSchema } from './objects/AuditLogInclude.schema';
import { AuditLogCreateInputObjectSchema as AuditLogCreateInputObjectSchema } from './objects/AuditLogCreateInput.schema';
import { AuditLogUncheckedCreateInputObjectSchema as AuditLogUncheckedCreateInputObjectSchema } from './objects/AuditLogUncheckedCreateInput.schema';

export const AuditLogCreateOneSchema: z.ZodType<Prisma.AuditLogCreateArgs> = z.object({ select: AuditLogSelectObjectSchema.optional(), include: AuditLogIncludeObjectSchema.optional(), data: z.union([AuditLogCreateInputObjectSchema, AuditLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AuditLogCreateArgs>;

export const AuditLogCreateOneZodSchema = z.object({ select: AuditLogSelectObjectSchema.optional(), include: AuditLogIncludeObjectSchema.optional(), data: z.union([AuditLogCreateInputObjectSchema, AuditLogUncheckedCreateInputObjectSchema]) }).strict();