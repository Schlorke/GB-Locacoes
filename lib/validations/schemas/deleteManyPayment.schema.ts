import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';

export const PaymentDeleteManySchema: z.ZodType<Prisma.PaymentDeleteManyArgs> = z.object({ where: PaymentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentDeleteManyArgs>;

export const PaymentDeleteManyZodSchema = z.object({ where: PaymentWhereInputObjectSchema.optional() }).strict();