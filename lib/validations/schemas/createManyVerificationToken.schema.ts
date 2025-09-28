/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { VerificationTokenCreateManyInputObjectSchema as VerificationTokenCreateManyInputObjectSchema } from './objects/VerificationTokenCreateManyInput.schema';

export const VerificationTokenCreateManySchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({ data: z.union([ VerificationTokenCreateManyInputObjectSchema, z.array(VerificationTokenCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenCreateManyArgs>;

export const VerificationTokenCreateManyZodSchema = z.object({ data: z.union([ VerificationTokenCreateManyInputObjectSchema, z.array(VerificationTokenCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();