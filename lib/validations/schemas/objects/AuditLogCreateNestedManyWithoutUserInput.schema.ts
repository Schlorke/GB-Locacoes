import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogCreateWithoutUserInputObjectSchema as AuditLogCreateWithoutUserInputObjectSchema } from './AuditLogCreateWithoutUserInput.schema';
import { AuditLogUncheckedCreateWithoutUserInputObjectSchema as AuditLogUncheckedCreateWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateWithoutUserInput.schema';
import { AuditLogCreateOrConnectWithoutUserInputObjectSchema as AuditLogCreateOrConnectWithoutUserInputObjectSchema } from './AuditLogCreateOrConnectWithoutUserInput.schema';
import { AuditLogCreateManyUserInputEnvelopeObjectSchema as AuditLogCreateManyUserInputEnvelopeObjectSchema } from './AuditLogCreateManyUserInputEnvelope.schema';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './AuditLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuditLogCreateWithoutUserInputObjectSchema), z.lazy(() => AuditLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AuditLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AuditLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AuditLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AuditLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AuditLogWhereUniqueInputObjectSchema), z.lazy(() => AuditLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AuditLogCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateNestedManyWithoutUserInput>;
export const AuditLogCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
