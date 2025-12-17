/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DriverOrderByWithRelationInputObjectSchema as DriverOrderByWithRelationInputObjectSchema } from './objects/DriverOrderByWithRelationInput.schema';
import { DriverWhereInputObjectSchema as DriverWhereInputObjectSchema } from './objects/DriverWhereInput.schema';
import { DriverWhereUniqueInputObjectSchema as DriverWhereUniqueInputObjectSchema } from './objects/DriverWhereUniqueInput.schema';
import { DriverScalarFieldEnumSchema } from './enums/DriverScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DriverFindManySelectSchema: z.ZodType<Prisma.DriverSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    phone: z.boolean().optional(),
    cnh: z.boolean().optional(),
    cnhCategory: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DriverSelect>;

export const DriverFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    phone: z.boolean().optional(),
    cnh: z.boolean().optional(),
    cnhCategory: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const DriverFindManySchema: z.ZodType<Prisma.DriverFindManyArgs> = z.object({ select: DriverFindManySelectSchema.optional(),  orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DriverScalarFieldEnumSchema, DriverScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DriverFindManyArgs>;

export const DriverFindManyZodSchema = z.object({ select: DriverFindManySelectSchema.optional(),  orderBy: z.union([DriverOrderByWithRelationInputObjectSchema, DriverOrderByWithRelationInputObjectSchema.array()]).optional(), where: DriverWhereInputObjectSchema.optional(), cursor: DriverWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DriverScalarFieldEnumSchema, DriverScalarFieldEnumSchema.array()]).optional() }).strict();