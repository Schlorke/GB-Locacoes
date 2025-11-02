/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './CartItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereInputObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeCountCartItemsArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeCountCartItemsArgsObjectZodSchema = makeSchema();
