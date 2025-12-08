/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountAccountsArgsObjectSchema as UserCountOutputTypeCountAccountsArgsObjectSchema } from './UserCountOutputTypeCountAccountsArgs.schema';
import { UserCountOutputTypeCountQuotesArgsObjectSchema as UserCountOutputTypeCountQuotesArgsObjectSchema } from './UserCountOutputTypeCountQuotesArgs.schema';
import { UserCountOutputTypeCountRentalsArgsObjectSchema as UserCountOutputTypeCountRentalsArgsObjectSchema } from './UserCountOutputTypeCountRentalsArgs.schema';
import { UserCountOutputTypeCountSessionsArgsObjectSchema as UserCountOutputTypeCountSessionsArgsObjectSchema } from './UserCountOutputTypeCountSessionsArgs.schema';
import { UserCountOutputTypeCountAddressesArgsObjectSchema as UserCountOutputTypeCountAddressesArgsObjectSchema } from './UserCountOutputTypeCountAddressesArgs.schema';
import { UserCountOutputTypeCountApprovedQuotesArgsObjectSchema as UserCountOutputTypeCountApprovedQuotesArgsObjectSchema } from './UserCountOutputTypeCountApprovedQuotesArgs.schema';
import { UserCountOutputTypeCountRejectedQuotesArgsObjectSchema as UserCountOutputTypeCountRejectedQuotesArgsObjectSchema } from './UserCountOutputTypeCountRejectedQuotesArgs.schema'

const makeSchema = () => z.object({
  accounts: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAccountsArgsObjectSchema)]).optional(),
  quotes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountQuotesArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRentalsArgsObjectSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountSessionsArgsObjectSchema)]).optional(),
  addresses: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAddressesArgsObjectSchema)]).optional(),
  approvedQuotes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountApprovedQuotesArgsObjectSchema)]).optional(),
  rejectedQuotes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRejectedQuotesArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
