import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCountOutputTypeCountItemsArgsObjectSchema as CartCountOutputTypeCountItemsArgsObjectSchema } from './CartCountOutputTypeCountItemsArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => CartCountOutputTypeCountItemsArgsObjectSchema)]).optional()
}).strict();
export const CartCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CartCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CartCountOutputTypeSelect>;
export const CartCountOutputTypeSelectObjectZodSchema = makeSchema();
