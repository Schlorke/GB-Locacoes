/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { AddressCreateNestedManyWithoutUserInputObjectSchema as AddressCreateNestedManyWithoutUserInputObjectSchema } from './AddressCreateNestedManyWithoutUserInput.schema';
import { AuditLogCreateNestedManyWithoutUserInputObjectSchema as AuditLogCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogCreateNestedManyWithoutUserInput.schema';
import { CartCreateNestedOneWithoutUserInputObjectSchema as CartCreateNestedOneWithoutUserInputObjectSchema } from './CartCreateNestedOneWithoutUserInput.schema';
import { QuoteCreateNestedManyWithoutApprovedByUserInputObjectSchema as QuoteCreateNestedManyWithoutApprovedByUserInputObjectSchema } from './QuoteCreateNestedManyWithoutApprovedByUserInput.schema';
import { QuoteCreateNestedManyWithoutRejectedByUserInputObjectSchema as QuoteCreateNestedManyWithoutRejectedByUserInputObjectSchema } from './QuoteCreateNestedManyWithoutRejectedByUserInput.schema';
import { QuoteCreateNestedManyWithoutUserInputObjectSchema as QuoteCreateNestedManyWithoutUserInputObjectSchema } from './QuoteCreateNestedManyWithoutUserInput.schema';
import { rentalsCreateNestedManyWithoutUsersInputObjectSchema as rentalsCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsCreateNestedManyWithoutUsersInput.schema';
import { NotificationCreateNestedManyWithoutUserInputObjectSchema as NotificationCreateNestedManyWithoutUserInputObjectSchema } from './NotificationCreateNestedManyWithoutUserInput.schema'

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
  cnpj: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  addresses: z.lazy(() => AddressCreateNestedManyWithoutUserInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputObjectSchema).optional(),
  cart: z.lazy(() => CartCreateNestedOneWithoutUserInputObjectSchema).optional(),
  approvedQuotes: z.lazy(() => QuoteCreateNestedManyWithoutApprovedByUserInputObjectSchema).optional(),
  rejectedQuotes: z.lazy(() => QuoteCreateNestedManyWithoutRejectedByUserInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsCreateNestedManyWithoutUsersInputObjectSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutSessionsInput>;
export const UserCreateWithoutSessionsInputObjectZodSchema = makeSchema();
