/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCountOutputTypeCountEquipmentsArgsObjectSchema as CategoryCountOutputTypeCountEquipmentsArgsObjectSchema } from './CategoryCountOutputTypeCountEquipmentsArgs.schema'

const makeSchema = () => z.object({
  equipments: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeCountEquipmentsArgsObjectSchema)]).optional()
}).strict();
export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCountOutputTypeSelect>;
export const CategoryCountOutputTypeSelectObjectZodSchema = makeSchema();
