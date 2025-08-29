import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  pricePerDay: z.literal(true).optional()
}).strict();
export const EquipmentSumAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentSumAggregateInputType>;
export const EquipmentSumAggregateInputObjectZodSchema = makeSchema();
