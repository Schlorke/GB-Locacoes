import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutEquipmentsInput.schema'

export const rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateOrConnectWithoutEquipmentsInput, Prisma.rental_itemsCreateOrConnectWithoutEquipmentsInput> = z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema)])
}).strict();
export const rental_itemsCreateOrConnectWithoutEquipmentsInputObjectZodSchema = z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema)])
}).strict();
