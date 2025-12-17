import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionUpdateManyMutationInputObjectSchema as PermissionUpdateManyMutationInputObjectSchema } from './objects/PermissionUpdateManyMutationInput.schema';
import { PermissionWhereInputObjectSchema as PermissionWhereInputObjectSchema } from './objects/PermissionWhereInput.schema';

export const PermissionUpdateManySchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({ data: PermissionUpdateManyMutationInputObjectSchema, where: PermissionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PermissionUpdateManyArgs>;

export const PermissionUpdateManyZodSchema = z.object({ data: PermissionUpdateManyMutationInputObjectSchema, where: PermissionWhereInputObjectSchema.optional() }).strict();