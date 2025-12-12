/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  year: SortOrderSchema.optional()
}).strict();
export const VehicleAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VehicleAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleAvgOrderByAggregateInput>;
export const VehicleAvgOrderByAggregateInputObjectZodSchema = makeSchema();
