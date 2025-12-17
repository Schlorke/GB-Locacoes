import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentTypeSchema } from '../enums/PaymentType.schema'

const makeSchema = () => z.object({
  set: PaymentTypeSchema.optional()
}).strict();
export const EnumPaymentTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPaymentTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentTypeFieldUpdateOperationsInput>;
export const EnumPaymentTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
