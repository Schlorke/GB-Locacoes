import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutUsersInputObjectSchema as rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema';
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema as rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema';
import { rentalsCreateOrConnectWithoutUsersInputObjectSchema as rentalsCreateOrConnectWithoutUsersInputObjectSchema } from './rentalsCreateOrConnectWithoutUsersInput.schema';
import { rentalsCreateManyUsersInputEnvelopeObjectSchema as rentalsCreateManyUsersInputEnvelopeObjectSchema } from './rentalsCreateManyUsersInputEnvelope.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutUsersInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyUsersInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const rentalsCreateNestedManyWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedManyWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateNestedManyWithoutUsersInput>;
export const rentalsCreateNestedManyWithoutUsersInputObjectZodSchema = makeSchema();
