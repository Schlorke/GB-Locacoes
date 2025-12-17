import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentOrderByWithRelationInputObjectSchema as PaymentOrderByWithRelationInputObjectSchema } from './objects/PaymentOrderByWithRelationInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentCountAggregateInputObjectSchema as PaymentCountAggregateInputObjectSchema } from './objects/PaymentCountAggregateInput.schema';

export const PaymentCountSchema: z.ZodType<Prisma.PaymentCountArgs> = z.object({ orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PaymentCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PaymentCountArgs>;

export const PaymentCountZodSchema = z.object({ orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PaymentCountAggregateInputObjectSchema ]).optional() }).strict();