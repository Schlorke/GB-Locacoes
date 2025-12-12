/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema'

const makeSchema = () => z.object({
  set: DeliveryTypeSchema.optional()
}).strict();
export const EnumDeliveryTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumDeliveryTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryTypeFieldUpdateOperationsInput>;
export const EnumDeliveryTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
