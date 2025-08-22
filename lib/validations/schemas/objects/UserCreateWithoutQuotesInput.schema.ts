import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { rentalsCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsCreateNestedManyWithoutUsersInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema'

export const UserCreateWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutQuotesInput, Prisma.UserCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string().nullish(),
  role: RoleSchema.optional(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutQuotesInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string().nullish(),
  role: RoleSchema.optional(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
