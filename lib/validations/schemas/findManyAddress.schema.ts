import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './objects/AddressInclude.schema';
import { AddressOrderByWithRelationInputObjectSchema as AddressOrderByWithRelationInputObjectSchema } from './objects/AddressOrderByWithRelationInput.schema';
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';
import { AddressWhereUniqueInputObjectSchema as AddressWhereUniqueInputObjectSchema } from './objects/AddressWhereUniqueInput.schema';
import { AddressScalarFieldEnumSchema } from './enums/AddressScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AddressFindManySelectSchema: z.ZodType<Prisma.AddressSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    street: z.boolean().optional(),
    number: z.boolean().optional(),
    complement: z.boolean().optional(),
    neighborhood: z.boolean().optional(),
    city: z.boolean().optional(),
    state: z.boolean().optional(),
    zipCode: z.boolean().optional(),
    isPrimary: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AddressSelect>;

export const AddressFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    street: z.boolean().optional(),
    number: z.boolean().optional(),
    complement: z.boolean().optional(),
    neighborhood: z.boolean().optional(),
    city: z.boolean().optional(),
    state: z.boolean().optional(),
    zipCode: z.boolean().optional(),
    isPrimary: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const AddressFindManySchema: z.ZodType<Prisma.AddressFindManyArgs> = z.object({ select: AddressFindManySelectSchema.optional(), include: z.lazy(() => AddressIncludeObjectSchema.optional()), orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AddressScalarFieldEnumSchema, AddressScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AddressFindManyArgs>;

export const AddressFindManyZodSchema = z.object({ select: AddressFindManySelectSchema.optional(), include: z.lazy(() => AddressIncludeObjectSchema.optional()), orderBy: z.union([AddressOrderByWithRelationInputObjectSchema, AddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: AddressWhereInputObjectSchema.optional(), cursor: AddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AddressScalarFieldEnumSchema, AddressScalarFieldEnumSchema.array()]).optional() }).strict();