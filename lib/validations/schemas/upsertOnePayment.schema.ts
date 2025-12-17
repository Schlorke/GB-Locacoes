import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentSelectObjectSchema as PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentCreateInputObjectSchema as PaymentCreateInputObjectSchema } from './objects/PaymentCreateInput.schema';
import { PaymentUncheckedCreateInputObjectSchema as PaymentUncheckedCreateInputObjectSchema } from './objects/PaymentUncheckedCreateInput.schema';
import { PaymentUpdateInputObjectSchema as PaymentUpdateInputObjectSchema } from './objects/PaymentUpdateInput.schema';
import { PaymentUncheckedUpdateInputObjectSchema as PaymentUncheckedUpdateInputObjectSchema } from './objects/PaymentUncheckedUpdateInput.schema';

export const PaymentUpsertOneSchema: z.ZodType<Prisma.PaymentUpsertArgs> = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), where: PaymentWhereUniqueInputObjectSchema, create: z.union([ PaymentCreateInputObjectSchema, PaymentUncheckedCreateInputObjectSchema ]), update: z.union([ PaymentUpdateInputObjectSchema, PaymentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PaymentUpsertArgs>;

export const PaymentUpsertOneZodSchema = z.object({ select: PaymentSelectObjectSchema.optional(), include: PaymentIncludeObjectSchema.optional(), where: PaymentWhereUniqueInputObjectSchema, create: z.union([ PaymentCreateInputObjectSchema, PaymentUncheckedCreateInputObjectSchema ]), update: z.union([ PaymentUpdateInputObjectSchema, PaymentUncheckedUpdateInputObjectSchema ]) }).strict();