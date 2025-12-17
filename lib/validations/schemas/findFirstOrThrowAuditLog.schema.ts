import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AuditLogIncludeObjectSchema as AuditLogIncludeObjectSchema } from './objects/AuditLogInclude.schema';
import { AuditLogOrderByWithRelationInputObjectSchema as AuditLogOrderByWithRelationInputObjectSchema } from './objects/AuditLogOrderByWithRelationInput.schema';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './objects/AuditLogWhereUniqueInput.schema';
import { AuditLogScalarFieldEnumSchema } from './enums/AuditLogScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AuditLogFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AuditLogSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    action: z.boolean().optional(),
    entity: z.boolean().optional(),
    entityId: z.boolean().optional(),
    changes: z.boolean().optional(),
    ipAddress: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AuditLogSelect>;

export const AuditLogFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    action: z.boolean().optional(),
    entity: z.boolean().optional(),
    entityId: z.boolean().optional(),
    changes: z.boolean().optional(),
    ipAddress: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const AuditLogFindFirstOrThrowSchema: z.ZodType<Prisma.AuditLogFindFirstOrThrowArgs> = z.object({ select: AuditLogFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AuditLogIncludeObjectSchema.optional()), orderBy: z.union([AuditLogOrderByWithRelationInputObjectSchema, AuditLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuditLogWhereInputObjectSchema.optional(), cursor: AuditLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AuditLogScalarFieldEnumSchema, AuditLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogFindFirstOrThrowArgs>;

export const AuditLogFindFirstOrThrowZodSchema = z.object({ select: AuditLogFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AuditLogIncludeObjectSchema.optional()), orderBy: z.union([AuditLogOrderByWithRelationInputObjectSchema, AuditLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuditLogWhereInputObjectSchema.optional(), cursor: AuditLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AuditLogScalarFieldEnumSchema, AuditLogScalarFieldEnumSchema.array()]).optional() }).strict();