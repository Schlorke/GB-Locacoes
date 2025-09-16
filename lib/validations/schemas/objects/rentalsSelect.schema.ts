import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { RentalsCountOutputTypeArgsObjectSchema } from './RentalsCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  startdate: z.boolean().optional(),
  enddate: z.boolean().optional(),
  total: z.boolean().optional(),
  status: z.boolean().optional(),
  userid: z.boolean().optional(),
  createdat: z.boolean().optional(),
  updatedat: z.boolean().optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RentalsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const rentalsSelectObjectSchema: z.ZodType<Prisma.rentalsSelect> = makeSchema() as unknown as z.ZodType<Prisma.rentalsSelect>;
export const rentalsSelectObjectZodSchema = makeSchema();
