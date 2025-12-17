import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DriverStatusSchema } from '../enums/DriverStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.string(),
  cnh: z.string().optional().nullable(),
  cnhCategory: z.string().optional().nullable(),
  status: DriverStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DriverCreateManyInputObjectSchema: z.ZodType<Prisma.DriverCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.DriverCreateManyInput>;
export const DriverCreateManyInputObjectZodSchema = makeSchema();
