import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './objects/CartOrderByWithRelationInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';
import { CartScalarFieldEnumSchema } from './enums/CartScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CartFindFirstSelectSchema: z.ZodType<Prisma.CartSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    items: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CartSelect>;

export const CartFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    items: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CartFindFirstSchema: z.ZodType<Prisma.CartFindFirstArgs> = z.object({ select: CartFindFirstSelectSchema.optional(), include: CartIncludeObjectSchema.optional(), orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CartScalarFieldEnumSchema, CartScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CartFindFirstArgs>;

export const CartFindFirstZodSchema = z.object({ select: CartFindFirstSelectSchema.optional(), include: CartIncludeObjectSchema.optional(), orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CartScalarFieldEnumSchema, CartScalarFieldEnumSchema.array()]).optional() }).strict();