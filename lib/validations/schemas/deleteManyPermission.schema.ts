import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionWhereInputObjectSchema as PermissionWhereInputObjectSchema } from './objects/PermissionWhereInput.schema';

export const PermissionDeleteManySchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({ where: PermissionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PermissionDeleteManyArgs>;

export const PermissionDeleteManyZodSchema = z.object({ where: PermissionWhereInputObjectSchema.optional() }).strict();