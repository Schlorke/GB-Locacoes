import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionUpdateManyMutationInputObjectSchema as PermissionUpdateManyMutationInputObjectSchema } from './objects/PermissionUpdateManyMutationInput.schema';
import { PermissionWhereInputObjectSchema as PermissionWhereInputObjectSchema } from './objects/PermissionWhereInput.schema';

export const PermissionUpdateManyAndReturnSchema: z.ZodType<Prisma.PermissionUpdateManyAndReturnArgs> = z.object({ select: PermissionSelectObjectSchema.optional(), data: PermissionUpdateManyMutationInputObjectSchema, where: PermissionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PermissionUpdateManyAndReturnArgs>;

export const PermissionUpdateManyAndReturnZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(), data: PermissionUpdateManyMutationInputObjectSchema, where: PermissionWhereInputObjectSchema.optional() }).strict();