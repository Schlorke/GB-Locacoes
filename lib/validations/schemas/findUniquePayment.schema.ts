import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentSelectObjectSchema as PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';

export const PaymentFindUniqueSchema: z.ZodType<Prisma.PaymentFindUniqueArgs> = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), where: PaymentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PaymentFindUniqueArgs>;

export const PaymentFindUniqueZodSchema = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), where: PaymentWhereUniqueInputObjectSchema }).strict();