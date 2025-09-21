import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { VerificationTokenSelectObjectSchema } from './objects/VerificationTokenSelect.schema';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';

export const VerificationTokenFindUniqueOrThrowSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  where: VerificationTokenWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs>;

export const VerificationTokenFindUniqueOrThrowZodSchema = z.object({ select: VerificationTokenSelectObjectSchema.optional(),  where: VerificationTokenWhereUniqueInputObjectSchema }).strict();