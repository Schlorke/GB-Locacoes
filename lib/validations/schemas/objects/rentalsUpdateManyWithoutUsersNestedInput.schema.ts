import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema';
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema';
import { rentalsCreateOrConnectWithoutUsersInputObjectSchema } from './rentalsCreateOrConnectWithoutUsersInput.schema';
import { rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema } from './rentalsUpsertWithWhereUniqueWithoutUsersInput.schema';
import { rentalsCreateManyUsersInputEnvelopeObjectSchema } from './rentalsCreateManyUsersInputEnvelope.schema';
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema } from './rentalsUpdateWithWhereUniqueWithoutUsersInput.schema';
import { rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema } from './rentalsUpdateManyWithWhereWithoutUsersInput.schema';
import { rentalsScalarWhereInputObjectSchema } from './rentalsScalarWhereInput.schema'

export const rentalsUpdateManyWithoutUsersNestedInputObjectSchema: z.ZodType<Prisma.rentalsUpdateManyWithoutUsersNestedInput, Prisma.rentalsUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema), z.lazy(() => rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyUsersInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema), z.lazy(() => rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema), z.lazy(() => rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => rentalsScalarWhereInputObjectSchema), z.lazy(() => rentalsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const rentalsUpdateManyWithoutUsersNestedInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema), z.lazy(() => rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyUsersInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema), z.lazy(() => rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema), z.lazy(() => rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => rentalsScalarWhereInputObjectSchema), z.lazy(() => rentalsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
