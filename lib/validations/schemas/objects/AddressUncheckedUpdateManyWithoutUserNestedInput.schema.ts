import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressCreateWithoutUserInputObjectSchema } from './AddressCreateWithoutUserInput.schema';
import { AddressUncheckedCreateWithoutUserInputObjectSchema } from './AddressUncheckedCreateWithoutUserInput.schema';
import { AddressCreateOrConnectWithoutUserInputObjectSchema } from './AddressCreateOrConnectWithoutUserInput.schema';
import { AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AddressUpsertWithWhereUniqueWithoutUserInput.schema';
import { AddressCreateManyUserInputEnvelopeObjectSchema } from './AddressCreateManyUserInputEnvelope.schema';
import { AddressWhereUniqueInputObjectSchema } from './AddressWhereUniqueInput.schema';
import { AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AddressUpdateWithWhereUniqueWithoutUserInput.schema';
import { AddressUpdateManyWithWhereWithoutUserInputObjectSchema } from './AddressUpdateManyWithWhereWithoutUserInput.schema';
import { AddressScalarWhereInputObjectSchema } from './AddressScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AddressCreateWithoutUserInputObjectSchema), z.lazy(() => AddressCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AddressUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AddressCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AddressCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AddressUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AddressCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AddressWhereUniqueInputObjectSchema), z.lazy(() => AddressWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AddressWhereUniqueInputObjectSchema), z.lazy(() => AddressWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AddressWhereUniqueInputObjectSchema), z.lazy(() => AddressWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AddressWhereUniqueInputObjectSchema), z.lazy(() => AddressWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AddressUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AddressScalarWhereInputObjectSchema), z.lazy(() => AddressScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AddressUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput>;
export const AddressUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
