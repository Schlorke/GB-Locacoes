import { z } from 'zod';
import { VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';
import { VerificationTokenOrderByWithAggregationInputObjectSchema } from './objects/VerificationTokenOrderByWithAggregationInput.schema';
import { VerificationTokenScalarWhereWithAggregatesInputObjectSchema } from './objects/VerificationTokenScalarWhereWithAggregatesInput.schema';
import { VerificationTokenScalarFieldEnumSchema } from './enums/VerificationTokenScalarFieldEnum.schema';
import { VerificationTokenCountAggregateInputObjectSchema } from './objects/VerificationTokenCountAggregateInput.schema';
import { VerificationTokenMinAggregateInputObjectSchema } from './objects/VerificationTokenMinAggregateInput.schema';
import { VerificationTokenMaxAggregateInputObjectSchema } from './objects/VerificationTokenMaxAggregateInput.schema';

export const VerificationTokenGroupBySchema = z.object({ where: VerificationTokenWhereInputObjectSchema.optional(), orderBy: z.union([VerificationTokenOrderByWithAggregationInputObjectSchema, VerificationTokenOrderByWithAggregationInputObjectSchema.array()]).optional(), having: VerificationTokenScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(VerificationTokenScalarFieldEnumSchema), _count: z.union([ z.literal(true), VerificationTokenCountAggregateInputObjectSchema ]).optional(), _min: VerificationTokenMinAggregateInputObjectSchema.optional(), _max: VerificationTokenMaxAggregateInputObjectSchema.optional() })