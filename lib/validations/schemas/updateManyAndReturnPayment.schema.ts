import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentSelectObjectSchema as PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentUpdateManyMutationInputObjectSchema as PaymentUpdateManyMutationInputObjectSchema } from './objects/PaymentUpdateManyMutationInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';

export const PaymentUpdateManyAndReturnSchema: z.ZodType<Prisma.PaymentUpdateManyAndReturnArgs> = z.object({ select: PaymentSelectObjectSchema.optional(), data: PaymentUpdateManyMutationInputObjectSchema, where: PaymentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentUpdateManyAndReturnArgs>;

export const PaymentUpdateManyAndReturnZodSchema = z.object({ select: PaymentSelectObjectSchema.optional(), data: PaymentUpdateManyMutationInputObjectSchema, where: PaymentWhereInputObjectSchema.optional() }).strict();