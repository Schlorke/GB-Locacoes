/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitOrderByWithRelationInputObjectSchema as EquipmentUnitOrderByWithRelationInputObjectSchema } from './objects/EquipmentUnitOrderByWithRelationInput.schema';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './objects/EquipmentUnitWhereInput.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';
import { EquipmentUnitScalarFieldEnumSchema } from './enums/EquipmentUnitScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EquipmentUnitFindFirstSelectSchema: z.ZodType<Prisma.EquipmentUnitSelect> = z.object({
    id: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    uniqueCode: z.boolean().optional(),
    status: z.boolean().optional(),
    hourMeter: z.boolean().optional(),
    odometer: z.boolean().optional(),
    serialNumber: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitSelect>;

export const EquipmentUnitFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    equipmentId: z.boolean().optional(),
    uniqueCode: z.boolean().optional(),
    status: z.boolean().optional(),
    hourMeter: z.boolean().optional(),
    odometer: z.boolean().optional(),
    serialNumber: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    equipment: z.boolean().optional()
  }).strict();

export const EquipmentUnitFindFirstSchema: z.ZodType<Prisma.EquipmentUnitFindFirstArgs> = z.object({ select: EquipmentUnitFindFirstSelectSchema.optional(), include: z.lazy(() => EquipmentUnitIncludeObjectSchema.optional()), orderBy: z.union([EquipmentUnitOrderByWithRelationInputObjectSchema, EquipmentUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentUnitWhereInputObjectSchema.optional(), cursor: EquipmentUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EquipmentUnitScalarFieldEnumSchema, EquipmentUnitScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitFindFirstArgs>;

export const EquipmentUnitFindFirstZodSchema = z.object({ select: EquipmentUnitFindFirstSelectSchema.optional(), include: z.lazy(() => EquipmentUnitIncludeObjectSchema.optional()), orderBy: z.union([EquipmentUnitOrderByWithRelationInputObjectSchema, EquipmentUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: EquipmentUnitWhereInputObjectSchema.optional(), cursor: EquipmentUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EquipmentUnitScalarFieldEnumSchema, EquipmentUnitScalarFieldEnumSchema.array()]).optional() }).strict();