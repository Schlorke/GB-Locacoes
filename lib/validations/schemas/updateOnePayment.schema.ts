import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentSelectObjectSchema as PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentUpdateInputObjectSchema as PaymentUpdateInputObjectSchema } from './objects/PaymentUpdateInput.schema';
import { PaymentUncheckedUpdateInputObjectSchema as PaymentUncheckedUpdateInputObjectSchema } from './objects/PaymentUncheckedUpdateInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';

export const PaymentUpdateOneSchema: z.ZodType<Prisma.PaymentUpdateArgs> = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), data: z.union([PaymentUpdateInputObjectSchema, PaymentUncheckedUpdateInputObjectSchema]), where: PaymentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PaymentUpdateArgs>;

export const PaymentUpdateOneZodSchema = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), data: z.union([PaymentUpdateInputObjectSchema, PaymentUncheckedUpdateInputObjectSchema]), where: PaymentWhereUniqueInputObjectSchema }).strict();