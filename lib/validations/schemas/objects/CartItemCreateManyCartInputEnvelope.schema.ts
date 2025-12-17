import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateManyCartInputObjectSchema as CartItemCreateManyCartInputObjectSchema } from './CartItemCreateManyCartInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CartItemCreateManyCartInputObjectSchema), z.lazy(() => CartItemCreateManyCartInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CartItemCreateManyCartInputEnvelopeObjectSchema: z.ZodType<Prisma.CartItemCreateManyCartInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyCartInputEnvelope>;
export const CartItemCreateManyCartInputEnvelopeObjectZodSchema = makeSchema();
