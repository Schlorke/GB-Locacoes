import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VerificationTokenWhereInputObjectSchema as VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';

export const VerificationTokenDeleteManySchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({ where: VerificationTokenWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenDeleteManyArgs>;

export const VerificationTokenDeleteManyZodSchema = z.object({ where: VerificationTokenWhereInputObjectSchema.optional() }).strict();