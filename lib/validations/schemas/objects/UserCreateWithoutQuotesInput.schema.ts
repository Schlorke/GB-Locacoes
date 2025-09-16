import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { rentalsCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsCreateNestedManyWithoutUsersInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutQuotesInput>;
export const UserCreateWithoutQuotesInputObjectZodSchema = makeSchema();
