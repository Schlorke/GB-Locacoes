import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentFindManySchema as EquipmentFindManySchema } from '../findManyEquipment.schema';
import { CategoryCountOutputTypeArgsObjectSchema as CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategoryIncludeObjectSchema: z.ZodType<Prisma.CategoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.CategoryInclude>;
export const CategoryIncludeObjectZodSchema = makeSchema();
