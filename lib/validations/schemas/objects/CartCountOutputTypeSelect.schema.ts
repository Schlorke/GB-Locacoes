import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  items: z.boolean().optional()
}).strict();
export const CartCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CartCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CartCountOutputTypeSelect>;
export const CartCountOutputTypeSelectObjectZodSchema = makeSchema();
