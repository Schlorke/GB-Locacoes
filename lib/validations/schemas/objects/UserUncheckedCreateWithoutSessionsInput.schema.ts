/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema as AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AddressUncheckedCreateNestedManyWithoutUserInput.schema';
import { AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { CartUncheckedCreateNestedOneWithoutUserInputObjectSchema as CartUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './CartUncheckedCreateNestedOneWithoutUserInput.schema';
import { QuoteUncheckedCreateNestedManyWithoutApprovedByUserInputObjectSchema as QuoteUncheckedCreateNestedManyWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutApprovedByUserInput.schema';
import { QuoteUncheckedCreateNestedManyWithoutRejectedByUserInputObjectSchema as QuoteUncheckedCreateNestedManyWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutRejectedByUserInput.schema';
import { QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema as QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './QuoteUncheckedCreateNestedManyWithoutUserInput.schema';
import { rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema as rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutUsersInput.schema'

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
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  addresses: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  approvedQuotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutApprovedByUserInputObjectSchema).optional(),
  rejectedQuotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutRejectedByUserInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput>;
export const UserUncheckedCreateWithoutSessionsInputObjectZodSchema = makeSchema();
