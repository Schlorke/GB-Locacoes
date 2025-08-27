import { z } from 'zod';
import { SessionWhereInputObjectSchema } from './objects/SessionWhereInput.schema';
import { SessionOrderByWithAggregationInputObjectSchema } from './objects/SessionOrderByWithAggregationInput.schema';
import { SessionScalarWhereWithAggregatesInputObjectSchema } from './objects/SessionScalarWhereWithAggregatesInput.schema';
import { SessionScalarFieldEnumSchema } from './enums/SessionScalarFieldEnum.schema';
import { SessionCountAggregateInputObjectSchema } from './objects/SessionCountAggregateInput.schema';
import { SessionMinAggregateInputObjectSchema } from './objects/SessionMinAggregateInput.schema';
import { SessionMaxAggregateInputObjectSchema } from './objects/SessionMaxAggregateInput.schema';

export const SessionGroupBySchema = z.object({ where: SessionWhereInputObjectSchema.optional(), orderBy: z.union([SessionOrderByWithAggregationInputObjectSchema, SessionOrderByWithAggregationInputObjectSchema.array()]).optional(), having: SessionScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(SessionScalarFieldEnumSchema), _count: z.union([ z.literal(true), SessionCountAggregateInputObjectSchema ]).optional(), _min: SessionMinAggregateInputObjectSchema.optional(), _max: SessionMaxAggregateInputObjectSchema.optional() })