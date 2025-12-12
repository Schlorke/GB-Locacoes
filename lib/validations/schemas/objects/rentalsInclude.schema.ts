/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteArgsObjectSchema as QuoteArgsObjectSchema } from './QuoteArgs.schema';
import { rental_itemsFindManySchema as rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PaymentFindManySchema as PaymentFindManySchema } from '../findManyPayment.schema';
import { DeliveryFindManySchema as DeliveryFindManySchema } from '../findManyDelivery.schema';
import { ContractArgsObjectSchema as ContractArgsObjectSchema } from './ContractArgs.schema';
import { RentalsCountOutputTypeArgsObjectSchema as RentalsCountOutputTypeArgsObjectSchema } from './RentalsCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  quote: z.union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => PaymentFindManySchema)]).optional(),
  deliveries: z.union([z.boolean(), z.lazy(() => DeliveryFindManySchema)]).optional(),
  contract: z.union([z.boolean(), z.lazy(() => ContractArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RentalsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const rentalsIncludeObjectSchema: z.ZodType<Prisma.rentalsInclude> = makeSchema() as unknown as z.ZodType<Prisma.rentalsInclude>;
export const rentalsIncludeObjectZodSchema = makeSchema();
