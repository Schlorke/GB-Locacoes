/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema'

const makeSchema = () => z.object({
  set: PaymentMethodSchema.optional()
}).strict();
export const EnumPaymentMethodFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPaymentMethodFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentMethodFieldUpdateOperationsInput>;
export const EnumPaymentMethodFieldUpdateOperationsInputObjectZodSchema = makeSchema();
