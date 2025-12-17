import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryCreateWithoutRentalInputObjectSchema as DeliveryCreateWithoutRentalInputObjectSchema } from './DeliveryCreateWithoutRentalInput.schema';
import { DeliveryUncheckedCreateWithoutRentalInputObjectSchema as DeliveryUncheckedCreateWithoutRentalInputObjectSchema } from './DeliveryUncheckedCreateWithoutRentalInput.schema';
import { DeliveryCreateOrConnectWithoutRentalInputObjectSchema as DeliveryCreateOrConnectWithoutRentalInputObjectSchema } from './DeliveryCreateOrConnectWithoutRentalInput.schema';
import { DeliveryUpsertWithWhereUniqueWithoutRentalInputObjectSchema as DeliveryUpsertWithWhereUniqueWithoutRentalInputObjectSchema } from './DeliveryUpsertWithWhereUniqueWithoutRentalInput.schema';
import { DeliveryCreateManyRentalInputEnvelopeObjectSchema as DeliveryCreateManyRentalInputEnvelopeObjectSchema } from './DeliveryCreateManyRentalInputEnvelope.schema';
import { DeliveryWhereUniqueInputObjectSchema as DeliveryWhereUniqueInputObjectSchema } from './DeliveryWhereUniqueInput.schema';
import { DeliveryUpdateWithWhereUniqueWithoutRentalInputObjectSchema as DeliveryUpdateWithWhereUniqueWithoutRentalInputObjectSchema } from './DeliveryUpdateWithWhereUniqueWithoutRentalInput.schema';
import { DeliveryUpdateManyWithWhereWithoutRentalInputObjectSchema as DeliveryUpdateManyWithWhereWithoutRentalInputObjectSchema } from './DeliveryUpdateManyWithWhereWithoutRentalInput.schema';
import { DeliveryScalarWhereInputObjectSchema as DeliveryScalarWhereInputObjectSchema } from './DeliveryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DeliveryCreateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryCreateWithoutRentalInputObjectSchema).array(), z.lazy(() => DeliveryUncheckedCreateWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUncheckedCreateWithoutRentalInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DeliveryCreateOrConnectWithoutRentalInputObjectSchema), z.lazy(() => DeliveryCreateOrConnectWithoutRentalInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => DeliveryUpsertWithWhereUniqueWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUpsertWithWhereUniqueWithoutRentalInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DeliveryCreateManyRentalInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => DeliveryWhereUniqueInputObjectSchema), z.lazy(() => DeliveryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => DeliveryWhereUniqueInputObjectSchema), z.lazy(() => DeliveryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => DeliveryWhereUniqueInputObjectSchema), z.lazy(() => DeliveryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => DeliveryWhereUniqueInputObjectSchema), z.lazy(() => DeliveryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => DeliveryUpdateWithWhereUniqueWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUpdateWithWhereUniqueWithoutRentalInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => DeliveryUpdateManyWithWhereWithoutRentalInputObjectSchema), z.lazy(() => DeliveryUpdateManyWithWhereWithoutRentalInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => DeliveryScalarWhereInputObjectSchema), z.lazy(() => DeliveryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const DeliveryUncheckedUpdateManyWithoutRentalNestedInputObjectSchema: z.ZodType<Prisma.DeliveryUncheckedUpdateManyWithoutRentalNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryUncheckedUpdateManyWithoutRentalNestedInput>;
export const DeliveryUncheckedUpdateManyWithoutRentalNestedInputObjectZodSchema = makeSchema();
