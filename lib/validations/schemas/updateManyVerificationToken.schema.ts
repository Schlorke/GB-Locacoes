import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { VerificationTokenUpdateManyMutationInputObjectSchema as VerificationTokenUpdateManyMutationInputObjectSchema } from './objects/VerificationTokenUpdateManyMutationInput.schema';
import { VerificationTokenWhereInputObjectSchema as VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';

export const VerificationTokenUpdateManySchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({ data: VerificationTokenUpdateManyMutationInputObjectSchema, where: VerificationTokenWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenUpdateManyArgs>;

export const VerificationTokenUpdateManyZodSchema = z.object({ data: VerificationTokenUpdateManyMutationInputObjectSchema, where: VerificationTokenWhereInputObjectSchema.optional() }).strict();