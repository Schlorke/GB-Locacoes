import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsCreateManyEquipmentsInputObjectSchema } from './rental_itemsCreateManyEquipmentsInput.schema'

export const rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInputEnvelope, Prisma.rental_itemsCreateManyEquipmentsInputEnvelope> = z.object({
  data: z.union([z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const rental_itemsCreateManyEquipmentsInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
