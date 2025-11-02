import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateManyEquipmentInputObjectSchema as CartItemCreateManyEquipmentInputObjectSchema } from './CartItemCreateManyEquipmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CartItemCreateManyEquipmentInputObjectSchema), z.lazy(() => CartItemCreateManyEquipmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CartItemCreateManyEquipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.CartItemCreateManyEquipmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyEquipmentInputEnvelope>;
export const CartItemCreateManyEquipmentInputEnvelopeObjectZodSchema = makeSchema();
