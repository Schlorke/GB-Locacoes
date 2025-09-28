/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rental_itemsOrderByWithRelationInputObjectSchema as rental_itemsOrderByWithRelationInputObjectSchema } from './objects/rental_itemsOrderByWithRelationInput.schema';
import { rental_itemsWhereInputObjectSchema as rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema';
import { Rental_itemsCountAggregateInputObjectSchema as Rental_itemsCountAggregateInputObjectSchema } from './objects/Rental_itemsCountAggregateInput.schema';

export const rental_itemsCountSchema: z.ZodType<Prisma.rental_itemsCountArgs> = z.object({ orderBy: z.union([rental_itemsOrderByWithRelationInputObjectSchema, rental_itemsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rental_itemsWhereInputObjectSchema.optional(), cursor: rental_itemsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), Rental_itemsCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.rental_itemsCountArgs>;

export const rental_itemsCountZodSchema = z.object({ orderBy: z.union([rental_itemsOrderByWithRelationInputObjectSchema, rental_itemsOrderByWithRelationInputObjectSchema.array()]).optional(), where: rental_itemsWhereInputObjectSchema.optional(), cursor: rental_itemsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), Rental_itemsCountAggregateInputObjectSchema ]).optional() }).strict();