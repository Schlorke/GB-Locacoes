import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentSelectObjectSchema as PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentCreateInputObjectSchema as PaymentCreateInputObjectSchema } from './objects/PaymentCreateInput.schema';
import { PaymentUncheckedCreateInputObjectSchema as PaymentUncheckedCreateInputObjectSchema } from './objects/PaymentUncheckedCreateInput.schema';

export const PaymentCreateOneSchema: z.ZodType<Prisma.PaymentCreateArgs> = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), data: z.union([PaymentCreateInputObjectSchema, PaymentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PaymentCreateArgs>;

export const PaymentCreateOneZodSchema = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), data: z.union([PaymentCreateInputObjectSchema, PaymentUncheckedCreateInputObjectSchema]) }).strict();