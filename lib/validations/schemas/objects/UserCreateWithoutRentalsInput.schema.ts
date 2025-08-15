import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { QuoteCreateNestedManyWithoutUserInputObjectSchema } from './QuoteCreateNestedManyWithoutUserInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema'

export const UserCreateWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutRentalsInput, Prisma.UserCreateWithoutRentalsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutRentalsInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
