/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsCreateWithoutEquipmentsInputObjectSchema as rental_itemsCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema as rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutEquipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema)])
}).strict();
export const rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateOrConnectWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateOrConnectWithoutEquipmentsInput>;
export const rental_itemsCreateOrConnectWithoutEquipmentsInputObjectZodSchema = makeSchema();
