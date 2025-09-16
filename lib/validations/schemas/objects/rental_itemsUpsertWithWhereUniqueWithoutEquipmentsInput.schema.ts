import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsUpdateWithoutEquipmentsInputObjectSchema } from './rental_itemsUpdateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedUpdateWithoutEquipmentsInput.schema';
import { rental_itemsCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutEquipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => rental_itemsUpdateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema)])
}).strict();
export const rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInput>;
export const rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInputObjectZodSchema = makeSchema();
