import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsCreateManyRentalsInputObjectSchema } from './rental_itemsCreateManyRentalsInput.schema'

export const rental_itemsCreateManyRentalsInputEnvelopeObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyRentalsInputEnvelope, Prisma.rental_itemsCreateManyRentalsInputEnvelope> = z.object({
  data: z.union([z.lazy(() => rental_itemsCreateManyRentalsInputObjectSchema), z.lazy(() => rental_itemsCreateManyRentalsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const rental_itemsCreateManyRentalsInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => rental_itemsCreateManyRentalsInputObjectSchema), z.lazy(() => rental_itemsCreateManyRentalsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
