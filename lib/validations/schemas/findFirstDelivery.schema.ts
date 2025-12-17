import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliveryIncludeObjectSchema as DeliveryIncludeObjectSchema } from './objects/DeliveryInclude.schema';
import { DeliveryOrderByWithRelationInputObjectSchema as DeliveryOrderByWithRelationInputObjectSchema } from './objects/DeliveryOrderByWithRelationInput.schema';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './objects/DeliveryWhereInput.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './objects/DeliveryWhereUniqueInput.schema';
import { DeliveryScalarFieldEnumSchema } from './enums/DeliveryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DeliveryFindFirstSelectSchema: z.ZodType<Prisma.DeliverySelect> = z.object({
    id: z.boolean().optional(),
    rentalId: z.boolean().optional(),
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    scheduledAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    address: z.boolean().optional(),
    distance: z.boolean().optional(),
    vehicleId: z.boolean().optional(),
    driverId: z.boolean().optional(),
    driverName: z.boolean().optional(),
    photos: z.boolean().optional(),
    checklist: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    rental: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DeliverySelect>;

export const DeliveryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    rentalId: z.boolean().optional(),
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    scheduledAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    address: z.boolean().optional(),
    distance: z.boolean().optional(),
    vehicleId: z.boolean().optional(),
    driverId: z.boolean().optional(),
    driverName: z.boolean().optional(),
    photos: z.boolean().optional(),
    checklist: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    rental: z.boolean().optional()
  }).strict();

export const DeliveryFindFirstSchema: z.ZodType<Prisma.DeliveryFindFirstArgs> = z.object({ select: DeliveryFindFirstSelectSchema.optional(), include: z.lazy(() => DeliveryIncludeObjectSchema.optional()), orderBy: z.union([DeliveryOrderByWithRelationInputObjectSchema, DeliveryOrderByWithRelationInputObjectSchema.array()]).optional(), where: DeliveryWhereInputObjectSchema.optional(), cursor: DeliveryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DeliveryScalarFieldEnumSchema, DeliveryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryFindFirstArgs>;

export const DeliveryFindFirstZodSchema = z.object({ select: DeliveryFindFirstSelectSchema.optional(), include: z.lazy(() => DeliveryIncludeObjectSchema.optional()), orderBy: z.union([DeliveryOrderByWithRelationInputObjectSchema, DeliveryOrderByWithRelationInputObjectSchema.array()]).optional(), where: DeliveryWhereInputObjectSchema.optional(), cursor: DeliveryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DeliveryScalarFieldEnumSchema, DeliveryScalarFieldEnumSchema.array()]).optional() }).strict();