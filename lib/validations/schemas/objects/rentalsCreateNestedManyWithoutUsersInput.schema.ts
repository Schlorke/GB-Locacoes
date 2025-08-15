import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema';
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema';
import { rentalsCreateOrConnectWithoutUsersInputObjectSchema } from './rentalsCreateOrConnectWithoutUsersInput.schema';
import { rentalsCreateManyUsersInputEnvelopeObjectSchema } from './rentalsCreateManyUsersInputEnvelope.schema';
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

export const rentalsCreateNestedManyWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedManyWithoutUsersInput, Prisma.rentalsCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyUsersInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const rentalsCreateNestedManyWithoutUsersInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyUsersInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
