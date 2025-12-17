import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DeliveryOrderByWithRelationInputObjectSchema as DeliveryOrderByWithRelationInputObjectSchema } from './objects/DeliveryOrderByWithRelationInput.schema';
import { DeliveryWhereInputObjectSchema as DeliveryWhereInputObjectSchema } from './objects/DeliveryWhereInput.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './objects/DeliveryWhereUniqueInput.schema';
import { DeliveryCountAggregateInputObjectSchema as DeliveryCountAggregateInputObjectSchema } from './objects/DeliveryCountAggregateInput.schema';

export const DeliveryCountSchema: z.ZodType<Prisma.DeliveryCountArgs> = z.object({ orderBy: z.union([DeliveryOrderByWithRelationInputObjectSchema, DeliveryOrderByWithRelationInputObjectSchema.array()]).optional(), where: DeliveryWhereInputObjectSchema.optional(), cursor: DeliveryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DeliveryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.DeliveryCountArgs>;

export const DeliveryCountZodSchema = z.object({ orderBy: z.union([DeliveryOrderByWithRelationInputObjectSchema, DeliveryOrderByWithRelationInputObjectSchema.array()]).optional(), where: DeliveryWhereInputObjectSchema.optional(), cursor: DeliveryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DeliveryCountAggregateInputObjectSchema ]).optional() }).strict();