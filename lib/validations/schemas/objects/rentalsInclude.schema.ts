import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ContractArgsObjectSchema as ContractArgsObjectSchema } from './ContractArgs.schema';
import { DeliveryFindManySchema as DeliveryFindManySchema } from '../findManyDelivery.schema';
import { PaymentFindManySchema as PaymentFindManySchema } from '../findManyPayment.schema';
import { rental_itemsFindManySchema as rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { QuoteArgsObjectSchema as QuoteArgsObjectSchema } from './QuoteArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RentalsCountOutputTypeArgsObjectSchema as RentalsCountOutputTypeArgsObjectSchema } from './RentalsCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  contract: z.union([z.boolean(), z.lazy(() => ContractArgsObjectSchema)]).optional(),
  deliveries: z.union([z.boolean(), z.lazy(() => DeliveryFindManySchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => PaymentFindManySchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)]).optional(),
  quote: z.union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RentalsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const rentalsIncludeObjectSchema: z.ZodType<Prisma.rentalsInclude> = makeSchema() as unknown as z.ZodType<Prisma.rentalsInclude>;
export const rentalsIncludeObjectZodSchema = makeSchema();
