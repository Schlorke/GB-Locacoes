import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VerificationTokenSelectObjectSchema as VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema';
import { VerificationTokenCreateInputObjectSchema as VerificationTokenCreateInputObjectSchema } from './objects/VerificationTokenCreateInput.schema';
import { VerificationTokenUncheckedCreateInputObjectSchema as VerificationTokenUncheckedCreateInputObjectSchema } from './objects/VerificationTokenUncheckedCreateInput.schema';

export const VerificationTokenCreateOneSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  data: z.union([VerificationTokenCreateInputObjectSchema, VerificationTokenUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.VerificationTokenCreateArgs>;

export const VerificationTokenCreateOneZodSchema = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  data: z.union([VerificationTokenCreateInputObjectSchema, VerificationTokenUncheckedCreateInputObjectSchema]) }).strict();