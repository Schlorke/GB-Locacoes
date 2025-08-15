import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const RentalsCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RentalsCountOutputTypeSelect, Prisma.RentalsCountOutputTypeSelect> = z.object({
  rental_items: z.boolean().optional()
}).strict();
export const RentalsCountOutputTypeSelectObjectZodSchema = z.object({
  rental_items: z.boolean().optional()
}).strict();
