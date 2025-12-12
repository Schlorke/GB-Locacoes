/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  year: SortOrderSchema.optional()
}).strict();
export const VehicleSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VehicleSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleSumOrderByAggregateInput>;
export const VehicleSumOrderByAggregateInputObjectZodSchema = makeSchema();
