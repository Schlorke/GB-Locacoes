/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DriverStatusSchema } from '../enums/DriverStatus.schema'

const makeSchema = () => z.object({
  set: DriverStatusSchema.optional()
}).strict();
export const EnumDriverStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumDriverStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumDriverStatusFieldUpdateOperationsInput>;
export const EnumDriverStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
