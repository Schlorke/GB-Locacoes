/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VerificationTokenOrderByWithRelationInputObjectSchema as VerificationTokenOrderByWithRelationInputObjectSchema } from './objects/VerificationTokenOrderByWithRelationInput.schema';
import { VerificationTokenWhereInputObjectSchema as VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';
import { VerificationTokenWhereUniqueInputObjectSchema as VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenScalarFieldEnumSchema } from './enums/VerificationTokenScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationTokenFindFirstOrThrowSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.VerificationTokenSelect>;

export const VerificationTokenFindFirstOrThrowSelectZodSchema = z.object({
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional()
  }).strict();

export const VerificationTokenFindFirstOrThrowSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({ select: VerificationTokenFindFirstOrThrowSelectSchema.optional(), include: , orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs>;

export const VerificationTokenFindFirstOrThrowZodSchema = z.object({ select: VerificationTokenFindFirstOrThrowSelectSchema.optional(), include: , orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional() }).strict();