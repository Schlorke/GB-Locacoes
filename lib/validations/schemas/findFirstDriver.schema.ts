import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverOrderByWithRelationInputObjectSchema as DriverOrderByWithRelationInputObjectSchema } from './objects/DriverOrderByWithRelationInput.schema';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';
import { DriverScalarFieldEnumSchema } from './enums/DriverScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DriverFindFirstSelectSchema: z.ZodType<Prisma.DriverSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    phone: z.boolean().optional(),
    cnh: z.boolean().optional(),
    cnhCategory: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DriverSelect>;

export const DriverFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    phone: z.boolean().optional(),
    cnh: z.boolean().optional(),
    cnhCategory: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const DriverFindFirstSchema: z.ZodType<Prisma.DriverFindFirstArgs> = z.object({ select: DriverFindFirstSelectSchema.optional(),  orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DriverScalarFieldEnumSchema, DriverScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DriverFindFirstArgs>;

export const DriverFindFirstZodSchema = z.object({ select: DriverFindFirstSelectSchema.optional(),  orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DriverScalarFieldEnumSchema, DriverScalarFieldEnumSchema.array()]).optional() }).strict();