/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsUpdateWithoutEquipmentsInputObjectSchema as rental_itemsUpdateWithoutEquipmentsInputObjectSchema } from './rental_itemsUpdateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema as rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedUpdateWithoutEquipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => rental_itemsUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema)])
}).strict();
export const rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInput>;
export const rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectZodSchema = makeSchema();
