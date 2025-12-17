import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogSelectObjectSchema as AuditLogSelectObjectSchema } from './objects/AuditLogSelect.schema';
import { AuditLogCreateManyInputObjectSchema as AuditLogCreateManyInputObjectSchema } from './objects/AuditLogCreateManyInput.schema';

export const AuditLogCreateManyAndReturnSchema: z.ZodType<Prisma.AuditLogCreateManyAndReturnArgs> = z.object({ select: AuditLogSelectObjectSchema.optional(), data: z.union([ AuditLogCreateManyInputObjectSchema, z.array(AuditLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogCreateManyAndReturnArgs>;

export const AuditLogCreateManyAndReturnZodSchema = z.object({ select: AuditLogSelectObjectSchema.optional(), data: z.union([ AuditLogCreateManyInputObjectSchema, z.array(AuditLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();