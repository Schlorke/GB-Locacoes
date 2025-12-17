import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema'

const makeSchema = () => z.object({
  set: DeliveryStatusSchema.optional()
}).strict();
export const EnumDeliveryStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumDeliveryStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryStatusFieldUpdateOperationsInput>;
export const EnumDeliveryStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
