import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogWhereUniqueInputObjectSchema as AuditLogWhereUniqueInputObjectSchema } from './AuditLogWhereUniqueInput.schema';
import { AuditLogUpdateWithoutUserInputObjectSchema as AuditLogUpdateWithoutUserInputObjectSchema } from './AuditLogUpdateWithoutUserInput.schema';
import { AuditLogUncheckedUpdateWithoutUserInputObjectSchema as AuditLogUncheckedUpdateWithoutUserInputObjectSchema } from './AuditLogUncheckedUpdateWithoutUserInput.schema';
import { AuditLogCreateWithoutUserInputObjectSchema as AuditLogCreateWithoutUserInputObjectSchema } from './AuditLogCreateWithoutUserInput.schema';
import { AuditLogUncheckedCreateWithoutUserInputObjectSchema as AuditLogUncheckedCreateWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AuditLogUpdateWithoutUserInputObjectSchema), z.lazy(() => AuditLogUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AuditLogCreateWithoutUserInputObjectSchema), z.lazy(() => AuditLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AuditLogUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput>;
export const AuditLogUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
