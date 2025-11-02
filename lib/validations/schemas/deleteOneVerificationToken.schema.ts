import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VerificationTokenSelectObjectSchema as VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema';
import { VerificationTokenWhereUniqueInputObjectSchema as VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';

export const VerificationTokenDeleteOneSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  where: VerificationTokenWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.VerificationTokenDeleteArgs>;

export const VerificationTokenDeleteOneZodSchema = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  where: VerificationTokenWhereUniqueInputObjectSchema }).strict();