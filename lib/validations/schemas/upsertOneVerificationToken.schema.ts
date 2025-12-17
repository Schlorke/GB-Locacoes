import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VerificationTokenSelectObjectSchema as VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema';
import { VerificationTokenWhereUniqueInputObjectSchema as VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenCreateInputObjectSchema as VerificationTokenCreateInputObjectSchema } from './objects/VerificationTokenCreateInput.schema';
import { VerificationTokenUncheckedCreateInputObjectSchema as VerificationTokenUncheckedCreateInputObjectSchema } from './objects/VerificationTokenUncheckedCreateInput.schema';
import { VerificationTokenUpdateInputObjectSchema as VerificationTokenUpdateInputObjectSchema } from './objects/VerificationTokenUpdateInput.schema';
import { VerificationTokenUncheckedUpdateInputObjectSchema as VerificationTokenUncheckedUpdateInputObjectSchema } from './objects/VerificationTokenUncheckedUpdateInput.schema';

export const VerificationTokenUpsertOneSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  where: VerificationTokenWhereUniqueInputObjectSchema, create: z.union([ VerificationTokenCreateInputObjectSchema, VerificationTokenUncheckedCreateInputObjectSchema ]), update: z.union([ VerificationTokenUpdateInputObjectSchema, VerificationTokenUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.VerificationTokenUpsertArgs>;

export const VerificationTokenUpsertOneZodSchema = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  where: VerificationTokenWhereUniqueInputObjectSchema, create: z.union([ VerificationTokenCreateInputObjectSchema, VerificationTokenUncheckedCreateInputObjectSchema ]), update: z.union([ VerificationTokenUpdateInputObjectSchema, VerificationTokenUncheckedUpdateInputObjectSchema ]) }).strict();