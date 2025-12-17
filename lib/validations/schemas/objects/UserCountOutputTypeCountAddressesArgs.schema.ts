import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './AddressWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AddressWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAddressesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAddressesArgsObjectZodSchema = makeSchema();
