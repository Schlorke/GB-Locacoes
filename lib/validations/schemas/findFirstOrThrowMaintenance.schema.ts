import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './objects/MaintenanceInclude.schema';
import { MaintenanceOrderByWithRelationInputObjectSchema as MaintenanceOrderByWithRelationInputObjectSchema } from './objects/MaintenanceOrderByWithRelationInput.schema';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './objects/MaintenanceWhereInput.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './objects/MaintenanceWhereUniqueInput.schema';
import { MaintenanceScalarFieldEnumSchema } from './enums/MaintenanceScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MaintenanceFindFirstOrThrowSelectSchema: z.ZodType<Prisma.MaintenanceSelect> = z.object({
    id: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    type: z.boolean().optional(),
    scheduledAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    cost: z.boolean().optional(),
    laborCost: z.boolean().optional(),
    partsCost: z.boolean().optional(),
    description: z.boolean().optional(),
    notes: z.boolean().optional(),
    technician: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.MaintenanceSelect>;

export const MaintenanceFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    type: z.boolean().optional(),
    scheduledAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    cost: z.boolean().optional(),
    laborCost: z.boolean().optional(),
    partsCost: z.boolean().optional(),
    description: z.boolean().optional(),
    notes: z.boolean().optional(),
    technician: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional()
  }).strict();

export const MaintenanceFindFirstOrThrowSchema: z.ZodType<Prisma.MaintenanceFindFirstOrThrowArgs> = z.object({ select: MaintenanceFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MaintenanceIncludeObjectSchema.optional()), orderBy: z.union([MaintenanceOrderByWithRelationInputObjectSchema, MaintenanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaintenanceWhereInputObjectSchema.optional(), cursor: MaintenanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MaintenanceScalarFieldEnumSchema, MaintenanceScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceFindFirstOrThrowArgs>;

export const MaintenanceFindFirstOrThrowZodSchema = z.object({ select: MaintenanceFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MaintenanceIncludeObjectSchema.optional()), orderBy: z.union([MaintenanceOrderByWithRelationInputObjectSchema, MaintenanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaintenanceWhereInputObjectSchema.optional(), cursor: MaintenanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MaintenanceScalarFieldEnumSchema, MaintenanceScalarFieldEnumSchema.array()]).optional() }).strict();