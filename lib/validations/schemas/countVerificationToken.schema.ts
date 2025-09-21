import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { VerificationTokenOrderByWithRelationInputObjectSchema } from './objects/VerificationTokenOrderByWithRelationInput.schema';
import { VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenCountAggregateInputObjectSchema } from './objects/VerificationTokenCountAggregateInput.schema';

export const VerificationTokenCountSchema: z.ZodType<Prisma.VerificationTokenCountArgs> = z.object({ orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), VerificationTokenCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenCountArgs>;

export const VerificationTokenCountZodSchema = z.object({ orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), VerificationTokenCountAggregateInputObjectSchema ]).optional() }).strict();