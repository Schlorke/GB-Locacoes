import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema'

const makeSchema = () => z.object({
  set: DeliveryTypeSchema.optional()
}).strict();
export const NullableEnumDeliveryTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumDeliveryTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumDeliveryTypeFieldUpdateOperationsInput>;
export const NullableEnumDeliveryTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
