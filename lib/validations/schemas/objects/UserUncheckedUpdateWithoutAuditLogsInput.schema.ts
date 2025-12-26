/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { EnumRoleFieldUpdateOperationsInputObjectSchema as EnumRoleFieldUpdateOperationsInputObjectSchema } from './EnumRoleFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AddressUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AddressUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AddressUncheckedUpdateManyWithoutUserNestedInput.schema';
import { CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema as CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './CartUncheckedUpdateOneWithoutUserNestedInput.schema';
import { QuoteUncheckedUpdateManyWithoutApprovedByUserNestedInputObjectSchema as QuoteUncheckedUpdateManyWithoutApprovedByUserNestedInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutApprovedByUserNestedInput.schema';
import { QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInputObjectSchema as QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInput.schema';
import { QuoteUncheckedUpdateManyWithoutUserNestedInputObjectSchema as QuoteUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutUserNestedInput.schema';
import { rentalsUncheckedUpdateManyWithoutUsersNestedInputObjectSchema as rentalsUncheckedUpdateManyWithoutUsersNestedInputObjectSchema } from './rentalsUncheckedUpdateManyWithoutUsersNestedInput.schema';
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { NotificationUncheckedUpdateManyWithoutUserNestedInputObjectSchema as NotificationUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './NotificationUncheckedUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  role: z.union([RoleSchema, z.lazy(() => EnumRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  cnpj: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  cpf: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  addresses: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  approvedQuotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutApprovedByUserNestedInputObjectSchema).optional(),
  rejectedQuotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInputObjectSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedUpdateManyWithoutUsersNestedInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutAuditLogsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuditLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
export const UserUncheckedUpdateWithoutAuditLogsInputObjectZodSchema = makeSchema();
