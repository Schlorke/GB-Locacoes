import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsCreateManyEquipmentsInputObjectSchema } from './rental_itemsCreateManyEquipmentsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInputEnvelope>;
export const rental_itemsCreateManyEquipmentsInputEnvelopeObjectZodSchema = makeSchema();
