import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionOrderByWithRelationInputObjectSchema as PermissionOrderByWithRelationInputObjectSchema } from './objects/PermissionOrderByWithRelationInput.schema';
import { PermissionWhereInputObjectSchema as PermissionWhereInputObjectSchema } from './objects/PermissionWhereInput.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';
import { PermissionScalarFieldEnumSchema } from './enums/PermissionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PermissionFindFirstSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
    id: z.boolean().optional(),
    role: z.boolean().optional(),
    module: z.boolean().optional(),
    action: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PermissionSelect>;

export const PermissionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    role: z.boolean().optional(),
    module: z.boolean().optional(),
    action: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const PermissionFindFirstSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({ select: PermissionFindFirstSelectSchema.optional(),  orderBy: z.union([PermissionOrderByWithRelationInputObjectSchema, PermissionOrderByWithRelationInputObjectSchema.array()]).optional(), where: PermissionWhereInputObjectSchema.optional(), cursor: PermissionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PermissionScalarFieldEnumSchema, PermissionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PermissionFindFirstArgs>;

export const PermissionFindFirstZodSchema = z.object({ select: PermissionFindFirstSelectSchema.optional(),  orderBy: z.union([PermissionOrderByWithRelationInputObjectSchema, PermissionOrderByWithRelationInputObjectSchema.array()]).optional(), where: PermissionWhereInputObjectSchema.optional(), cursor: PermissionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PermissionScalarFieldEnumSchema, PermissionScalarFieldEnumSchema.array()]).optional() }).strict();