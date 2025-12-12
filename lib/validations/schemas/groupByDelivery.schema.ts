/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './objects/DeliveryWhereInput.schema';
import { DeliveryOrderByWithAggregationInputObjectSchema as DeliveryOrderByWithAggregationInputObjectSchema } from './objects/DeliveryOrderByWithAggregationInput.schema';
import { DeliveryScalarWhereWithAggregatesInputObjectSchema as DeliveryScalarWhereWithAggregatesInputObjectSchema } from './objects/DeliveryScalarWhereWithAggregatesInput.schema';
import { DeliveryScalarFieldEnumSchema } from './enums/DeliveryScalarFieldEnum.schema';
import { DeliveryCountAggregateInputObjectSchema as DeliveryCountAggregateInputObjectSchema } from './objects/DeliveryCountAggregateInput.schema';
import { DeliveryMinAggregateInputObjectSchema as DeliveryMinAggregateInputObjectSchema } from './objects/DeliveryMinAggregateInput.schema';
import { DeliveryMaxAggregateInputObjectSchema as DeliveryMaxAggregateInputObjectSchema } from './objects/DeliveryMaxAggregateInput.schema';
import { DeliveryAvgAggregateInputObjectSchema as DeliveryAvgAggregateInputObjectSchema } from './objects/DeliveryAvgAggregateInput.schema';
import { DeliverySumAggregateInputObjectSchema as DeliverySumAggregateInputObjectSchema } from './objects/DeliverySumAggregateInput.schema';

export const DeliveryGroupBySchema: z.ZodType<Prisma.DeliveryGroupByArgs> = z.object({ where: DeliveryWhereInputObjectSchema.optional(), orderBy: z.union([DeliveryOrderByWithAggregationInputObjectSchema, DeliveryOrderByWithAggregationInputObjectSchema.array()]).optional(), having: DeliveryScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(DeliveryScalarFieldEnumSchema), _count: z.union([ z.literal(true), DeliveryCountAggregateInputObjectSchema ]).optional(), _min: DeliveryMinAggregateInputObjectSchema.optional(), _max: DeliveryMaxAggregateInputObjectSchema.optional(), _avg: DeliveryAvgAggregateInputObjectSchema.optional(), _sum: DeliverySumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryGroupByArgs>;

export const DeliveryGroupByZodSchema = z.object({ where: DeliveryWhereInputObjectSchema.optional(), orderBy: z.union([DeliveryOrderByWithAggregationInputObjectSchema, DeliveryOrderByWithAggregationInputObjectSchema.array()]).optional(), having: DeliveryScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(DeliveryScalarFieldEnumSchema), _count: z.union([ z.literal(true), DeliveryCountAggregateInputObjectSchema ]).optional(), _min: DeliveryMinAggregateInputObjectSchema.optional(), _max: DeliveryMaxAggregateInputObjectSchema.optional(), _avg: DeliveryAvgAggregateInputObjectSchema.optional(), _sum: DeliverySumAggregateInputObjectSchema.optional() }).strict();