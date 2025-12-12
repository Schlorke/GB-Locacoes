/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  rental_items: z.boolean().optional(),
  payments: z.boolean().optional(),
  deliveries: z.boolean().optional()
}).strict();
export const RentalsCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RentalsCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RentalsCountOutputTypeSelect>;
export const RentalsCountOutputTypeSelectObjectZodSchema = makeSchema();
