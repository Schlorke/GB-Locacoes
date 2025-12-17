import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentOrderByWithRelationInputObjectSchema as PaymentOrderByWithRelationInputObjectSchema } from './objects/PaymentOrderByWithRelationInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentCountAggregateInputObjectSchema as PaymentCountAggregateInputObjectSchema } from './objects/PaymentCountAggregateInput.schema';
import { PaymentMinAggregateInputObjectSchema as PaymentMinAggregateInputObjectSchema } from './objects/PaymentMinAggregateInput.schema';
import { PaymentMaxAggregateInputObjectSchema as PaymentMaxAggregateInputObjectSchema } from './objects/PaymentMaxAggregateInput.schema';
import { PaymentAvgAggregateInputObjectSchema as PaymentAvgAggregateInputObjectSchema } from './objects/PaymentAvgAggregateInput.schema';
import { PaymentSumAggregateInputObjectSchema as PaymentSumAggregateInputObjectSchema } from './objects/PaymentSumAggregateInput.schema';

export const PaymentAggregateSchema: z.ZodType<Prisma.PaymentAggregateArgs> = z.object({ orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PaymentCountAggregateInputObjectSchema ]).optional(), _min: PaymentMinAggregateInputObjectSchema.optional(), _max: PaymentMaxAggregateInputObjectSchema.optional(), _avg: PaymentAvgAggregateInputObjectSchema.optional(), _sum: PaymentSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentAggregateArgs>;

export const PaymentAggregateZodSchema = z.object({ orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PaymentCountAggregateInputObjectSchema ]).optional(), _min: PaymentMinAggregateInputObjectSchema.optional(), _max: PaymentMaxAggregateInputObjectSchema.optional(), _avg: PaymentAvgAggregateInputObjectSchema.optional(), _sum: PaymentSumAggregateInputObjectSchema.optional() }).strict();