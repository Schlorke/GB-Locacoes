import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogCreateWithoutUserInputObjectSchema as AuditLogCreateWithoutUserInputObjectSchema } from './AuditLogCreateWithoutUserInput.schema';
import { AuditLogUncheckedCreateWithoutUserInputObjectSchema as AuditLogUncheckedCreateWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateWithoutUserInput.schema';
import { AuditLogCreateOrConnectWithoutUserInputObjectSchema as AuditLogCreateOrConnectWithoutUserInputObjectSchema } from './AuditLogCreateOrConnectWithoutUserInput.schema';
import { AuditLogUpsertWithWhereUniqueWithoutUserInputObjectSchema as AuditLogUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AuditLogUpsertWithWhereUniqueWithoutUserInput.schema';
import { AuditLogCreateManyUserInputEnvelopeObjectSchema as AuditLogCreateManyUserInputEnvelopeObjectSchema } from './AuditLogCreateManyUserInputEnvelope.schema';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './AuditLogWhereUniqueInput.schema';
import { AuditLogUpdateWithWhereUniqueWithoutUserInputObjectSchema as AuditLogUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AuditLogUpdateWithWhereUniqueWithoutUserInput.schema';
import { AuditLogUpdateManyWithWhereWithoutUserInputObjectSchema as AuditLogUpdateManyWithWhereWithoutUserInputObjectSchema } from './AuditLogUpdateManyWithWhereWithoutUserInput.schema';
import { AuditLogScalarWhereInputObjectSchema as AuditLogScalarWhereInputObjectSchema } from './AuditLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuditLogCreateWithoutUserInputObjectSchema), z.lazy(() => AuditLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AuditLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AuditLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AuditLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AuditLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AuditLogWhereUniqueInputObjectSchema), z.lazy(() => AuditLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AuditLogWhereUniqueInputObjectSchema), z.lazy(() => AuditLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AuditLogWhereUniqueInputObjectSchema), z.lazy(() => AuditLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AuditLogWhereUniqueInputObjectSchema), z.lazy(() => AuditLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AuditLogUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AuditLogUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AuditLogScalarWhereInputObjectSchema), z.lazy(() => AuditLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AuditLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput>;
export const AuditLogUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
