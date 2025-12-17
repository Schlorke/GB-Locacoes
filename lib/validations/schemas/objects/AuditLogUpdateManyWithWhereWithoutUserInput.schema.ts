import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AuditLogScalarWhereInputObjectSchema as AuditLogScalarWhereInputObjectSchema } from './AuditLogScalarWhereInput.schema';
import { AuditLogUpdateManyMutationInputObjectSchema as AuditLogUpdateManyMutationInputObjectSchema } from './AuditLogUpdateManyMutationInput.schema';
import { AuditLogUncheckedUpdateManyWithoutUserInputObjectSchema as AuditLogUncheckedUpdateManyWithoutUserInputObjectSchema } from './AuditLogUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuditLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AuditLogUpdateManyMutationInputObjectSchema), z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AuditLogUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUpdateManyWithWhereWithoutUserInput>;
export const AuditLogUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
