/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';

export const PermissionDeleteOneSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PermissionDeleteArgs>;

export const PermissionDeleteOneZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema }).strict();