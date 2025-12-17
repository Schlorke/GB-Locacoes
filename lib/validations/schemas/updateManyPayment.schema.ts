import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentUpdateManyMutationInputObjectSchema as PaymentUpdateManyMutationInputObjectSchema } from './objects/PaymentUpdateManyMutationInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';

export const PaymentUpdateManySchema: z.ZodType<Prisma.PaymentUpdateManyArgs> = z.object({ data: PaymentUpdateManyMutationInputObjectSchema, where: PaymentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentUpdateManyArgs>;

export const PaymentUpdateManyZodSchema = z.object({ data: PaymentUpdateManyMutationInputObjectSchema, where: PaymentWhereInputObjectSchema.optional() }).strict();