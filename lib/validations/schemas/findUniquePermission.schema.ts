import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';

export const PermissionFindUniqueSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PermissionFindUniqueArgs>;

export const PermissionFindUniqueZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema }).strict();