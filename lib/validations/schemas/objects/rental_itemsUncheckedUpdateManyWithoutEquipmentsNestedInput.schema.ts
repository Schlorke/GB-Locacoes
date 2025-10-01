/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rental_itemsCreateWithoutEquipmentsInputObjectSchema as rental_itemsCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateWithoutEquipmentsInput.schema';
import { rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema as rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutEquipmentsInput.schema';
import { rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema as rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema } from './rental_itemsCreateOrConnectWithoutEquipmentsInput.schema';
import { rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInputObjectSchema as rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInputObjectSchema } from './rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInput.schema';
import { rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema as rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema } from './rental_itemsCreateManyEquipmentsInputEnvelope.schema';
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema';
import { rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectSchema as rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectSchema } from './rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInput.schema';
import { rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectSchema as rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectSchema } from './rental_itemsUpdateManyWithWhereWithoutEquipmentsInput.schema';
import { rental_itemsScalarWhereInputObjectSchema as rental_itemsScalarWhereInputObjectSchema } from './rental_itemsScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateWithoutEquipmentsInputObjectSchema).array(), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsCreateOrConnectWithoutEquipmentsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUpsertWithWhereUniqueWithoutEquipmentsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => rental_itemsWhereUniqueInputObjectSchema), z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => rental_itemsWhereUniqueInputObjectSchema), z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => rental_itemsWhereUniqueInputObjectSchema), z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => rental_itemsWhereUniqueInputObjectSchema), z.lazy(() => rental_itemsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectSchema), z.lazy(() => rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => rental_itemsScalarWhereInputObjectSchema), z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInput>;
export const rental_itemsUncheckedUpdateManyWithoutEquipmentsNestedInputObjectZodSchema = makeSchema();
