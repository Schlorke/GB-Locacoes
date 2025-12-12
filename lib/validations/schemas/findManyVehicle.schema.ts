/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VehicleOrderByWithRelationInputObjectSchema as VehicleOrderByWithRelationInputObjectSchema } from './objects/VehicleOrderByWithRelationInput.schema';
import { VehicleWhereInputObjectSchema as VehicleWhereInputObjectSchema } from './objects/VehicleWhereInput.schema';
import { VehicleWhereUniqueInputObjectSchema as VehicleWhereUniqueInputObjectSchema } from './objects/VehicleWhereUniqueInput.schema';
import { VehicleScalarFieldEnumSchema } from './enums/VehicleScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VehicleFindManySelectSchema: z.ZodType<Prisma.VehicleSelect> = z.object({
    id: z.boolean().optional(),
    plate: z.boolean().optional(),
    brand: z.boolean().optional(),
    model: z.boolean().optional(),
    year: z.boolean().optional(),
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.VehicleSelect>;

export const VehicleFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    plate: z.boolean().optional(),
    brand: z.boolean().optional(),
    model: z.boolean().optional(),
    year: z.boolean().optional(),
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const VehicleFindManySchema: z.ZodType<Prisma.VehicleFindManyArgs> = z.object({ select: VehicleFindManySelectSchema.optional(),  orderBy: z.union([VehicleOrderByWithRelationInputObjectSchema, VehicleOrderByWithRelationInputObjectSchema.array()]).optional(), where: VehicleWhereInputObjectSchema.optional(), cursor: VehicleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VehicleScalarFieldEnumSchema, VehicleScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.VehicleFindManyArgs>;

export const VehicleFindManyZodSchema = z.object({ select: VehicleFindManySelectSchema.optional(),  orderBy: z.union([VehicleOrderByWithRelationInputObjectSchema, VehicleOrderByWithRelationInputObjectSchema.array()]).optional(), where: VehicleWhereInputObjectSchema.optional(), cursor: VehicleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VehicleScalarFieldEnumSchema, VehicleScalarFieldEnumSchema.array()]).optional() }).strict();