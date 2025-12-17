import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogSelectObjectSchema as AuditLogSelectObjectSchema } from './objects/AuditLogSelect.schema';
import { AuditLogIncludeObjectSchema as AuditLogIncludeObjectSchema } from './objects/AuditLogInclude.schema';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './objects/AuditLogWhereUniqueInput.schema';
import { AuditLogCreateInputObjectSchema as AuditLogCreateInputObjectSchema } from './objects/AuditLogCreateInput.schema';
import { AuditLogUncheckedCreateInputObjectSchema as AuditLogUncheckedCreateInputObjectSchema } from './objects/AuditLogUncheckedCreateInput.schema';
import { AuditLogUpdateInputObjectSchema as AuditLogUpdateInputObjectSchema } from './objects/AuditLogUpdateInput.schema';
import { AuditLogUncheckedUpdateInputObjectSchema as AuditLogUncheckedUpdateInputObjectSchema } from './objects/AuditLogUncheckedUpdateInput.schema';

export const AuditLogUpsertOneSchema: z.ZodType<Prisma.AuditLogUpsertArgs> = z.object({ select: AuditLogSelectObjectSchema.optional(), include: AuditLogIncludeObjectSchema.optional(), where: AuditLogWhereUniqueInputObjectSchema, create: z.union([ AuditLogCreateInputObjectSchema, AuditLogUncheckedCreateInputObjectSchema ]), update: z.union([ AuditLogUpdateInputObjectSchema, AuditLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AuditLogUpsertArgs>;

export const AuditLogUpsertOneZodSchema = z.object({ select: AuditLogSelectObjectSchema.optional(), include: AuditLogIncludeObjectSchema.optional(), where: AuditLogWhereUniqueInputObjectSchema, create: z.union([ AuditLogCreateInputObjectSchema, AuditLogUncheckedCreateInputObjectSchema ]), update: z.union([ AuditLogUpdateInputObjectSchema, AuditLogUncheckedUpdateInputObjectSchema ]) }).strict();