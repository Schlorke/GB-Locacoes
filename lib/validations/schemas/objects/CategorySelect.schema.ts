import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentFindManySchema } from '../findManyEquipment.schema';
import { CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  icon: z.boolean().optional(),
  iconColor: z.boolean().optional(),
  bgColor: z.boolean().optional(),
  fontColor: z.boolean().optional(),
  slug: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  equipments: z.union([z.boolean(), z.lazy(() => EquipmentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategorySelectObjectSchema: z.ZodType<Prisma.CategorySelect> = makeSchema() as unknown as z.ZodType<Prisma.CategorySelect>;
export const CategorySelectObjectZodSchema = makeSchema();
