import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogSelectObjectSchema as AuditLogSelectObjectSchema } from './objects/AuditLogSelect.schema';
import { AuditLogUpdateManyMutationInputObjectSchema as AuditLogUpdateManyMutationInputObjectSchema } from './objects/AuditLogUpdateManyMutationInput.schema';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';

export const AuditLogUpdateManyAndReturnSchema: z.ZodType<Prisma.AuditLogUpdateManyAndReturnArgs> = z.object({ select: AuditLogSelectObjectSchema.optional(), data: AuditLogUpdateManyMutationInputObjectSchema, where: AuditLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogUpdateManyAndReturnArgs>;

export const AuditLogUpdateManyAndReturnZodSchema = z.object({ select: AuditLogSelectObjectSchema.optional(), data: AuditLogUpdateManyMutationInputObjectSchema, where: AuditLogWhereInputObjectSchema.optional() }).strict();