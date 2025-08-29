import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { Rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { rentalsCountOutputTypeArgsObjectSchema } from './rentalsCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  rental_items: z.union([z.boolean(), z.lazy(() => Rental_itemsFindManySchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => rentalsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const rentalsIncludeObjectSchema: z.ZodType<Prisma.rentalsInclude> = makeSchema() as unknown as z.ZodType<Prisma.rentalsInclude>;
export const rentalsIncludeObjectZodSchema = makeSchema();
