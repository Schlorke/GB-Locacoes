import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const EquipmentWhereUniqueInputObjectSchema: z.ZodType<Prisma.EquipmentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentWhereUniqueInput>;
export const EquipmentWhereUniqueInputObjectZodSchema = makeSchema();
