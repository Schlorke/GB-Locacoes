import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutSessionsInputObjectSchema } from './UserCreateWithoutSessionsInput.schema';
import { UserUncheckedCreateWithoutSessionsInputObjectSchema } from './UserUncheckedCreateWithoutSessionsInput.schema';
import { UserCreateOrConnectWithoutSessionsInputObjectSchema } from './UserCreateOrConnectWithoutSessionsInput.schema';
import { UserUpsertWithoutSessionsInputObjectSchema } from './UserUpsertWithoutSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutSessionsInput.schema';
import { UserUpdateWithoutSessionsInputObjectSchema } from './UserUpdateWithoutSessionsInput.schema';
import { UserUncheckedUpdateWithoutSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputObjectSchema), z.lazy(() => UserUpdateWithoutSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput>;
export const UserUpdateOneRequiredWithoutSessionsNestedInputObjectZodSchema = makeSchema();
