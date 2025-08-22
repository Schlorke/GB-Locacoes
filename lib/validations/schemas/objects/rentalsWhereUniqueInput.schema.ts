import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rentalsWhereUniqueInputObjectSchema: z.ZodType<Prisma.rentalsWhereUniqueInput, Prisma.rentalsWhereUniqueInput> = z.object({
  id: z.string()
}).strict();
export const rentalsWhereUniqueInputObjectZodSchema = z.object({
  id: z.string()
}).strict();
