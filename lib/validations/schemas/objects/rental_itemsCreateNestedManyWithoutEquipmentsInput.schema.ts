/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsCreateWithoutEquipmentsInputObjectSchema as rental_itemsCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema as rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutEquipmentsInput.schema';
import { rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema as rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateOrConnectWithoutEquipmentsInput.schema';
import { Equipmentsrental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema as rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema } from './rental_itemsCreateManyEquipmentsInputEnvelope.schema';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema).array(), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => rental_itemsWhereUniqueInputObjectSchema), z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const rental_itemsCreateNestedManyWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateNestedManyWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateNestedManyWithoutEquipmentsInput>;
export const rental_itemsCreateNestedManyWithoutEquipmentsInputObjectZodSchema = makeSchema();
