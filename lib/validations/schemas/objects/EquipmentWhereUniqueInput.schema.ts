import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const EquipmentWhereUniqueInputObjectSchema: z.ZodType<Prisma.EquipmentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentWhereUniqueInput>;
export const EquipmentWhereUniqueInputObjectZodSchema = makeSchema();
