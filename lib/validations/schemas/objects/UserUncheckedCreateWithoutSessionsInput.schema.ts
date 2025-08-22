import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutUserInput.schema';
import { rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutUsersInput.schema'

export const UserUncheckedCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
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
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutSessionsInputObjectZodSchema = z.object({
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
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional()
}).strict();
