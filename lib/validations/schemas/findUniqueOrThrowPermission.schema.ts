import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';

export const PermissionFindUniqueOrThrowSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs>;

export const PermissionFindUniqueOrThrowZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema }).strict();