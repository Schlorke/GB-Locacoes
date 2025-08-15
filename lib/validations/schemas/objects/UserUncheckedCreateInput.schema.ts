import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutUserInput.schema';
import { rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutUsersInput.schema';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'

export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput, Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
