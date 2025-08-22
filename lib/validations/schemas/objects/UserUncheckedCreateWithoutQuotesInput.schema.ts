import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutUsersInput.schema';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'

export const UserUncheckedCreateWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutQuotesInput, Prisma.UserUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string().nullish(),
  role: RoleSchema.optional(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutQuotesInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string().nullish(),
  role: RoleSchema.optional(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
