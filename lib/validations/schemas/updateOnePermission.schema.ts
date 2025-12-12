/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionUpdateInputObjectSchema as PermissionUpdateInputObjectSchema } from './objects/PermissionUpdateInput.schema';
import { PermissionUncheckedUpdateInputObjectSchema as PermissionUncheckedUpdateInputObjectSchema } from './objects/PermissionUncheckedUpdateInput.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';

export const PermissionUpdateOneSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({ select: PermissionSelectObjectSchema.optional(),  data: z.union([PermissionUpdateInputObjectSchema, PermissionUncheckedUpdateInputObjectSchema]), where: PermissionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PermissionUpdateArgs>;

export const PermissionUpdateOneZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(),  data: z.union([PermissionUpdateInputObjectSchema, PermissionUncheckedUpdateInputObjectSchema]), where: PermissionWhereUniqueInputObjectSchema }).strict();