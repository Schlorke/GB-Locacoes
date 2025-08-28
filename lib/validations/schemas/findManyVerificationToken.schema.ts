import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { VerificationTokenOrderByWithRelationInputObjectSchema } from './objects/VerificationTokenOrderByWithRelationInput.schema';
import { VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenScalarFieldEnumSchema } from './enums/VerificationTokenScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationTokenFindManySelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.VerificationTokenSelect>;

export const VerificationTokenFindManySelectZodSchema = z.object({
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional()
  }).strict();

export const VerificationTokenFindManySchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({ select: VerificationTokenFindManySelectSchema.optional(),  orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.VerificationTokenScalarFieldEnum), z.nativeEnum(Prisma.VerificationTokenScalarFieldEnum).array()]).optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenFindManyArgs>;

export const VerificationTokenFindManyZodSchema = z.object({ select: VerificationTokenFindManySelectSchema.optional(),  orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.VerificationTokenScalarFieldEnum), z.nativeEnum(Prisma.VerificationTokenScalarFieldEnum).array()]).optional() }).strict();