import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionWhereUniqueInputObjectSchema as PermissionWhereUniqueInputObjectSchema } from './objects/PermissionWhereUniqueInput.schema';
import { PermissionCreateInputObjectSchema as PermissionCreateInputObjectSchema } from './objects/PermissionCreateInput.schema';
import { PermissionUncheckedCreateInputObjectSchema as PermissionUncheckedCreateInputObjectSchema } from './objects/PermissionUncheckedCreateInput.schema';
import { PermissionUpdateInputObjectSchema as PermissionUpdateInputObjectSchema } from './objects/PermissionUpdateInput.schema';
import { PermissionUncheckedUpdateInputObjectSchema as PermissionUncheckedUpdateInputObjectSchema } from './objects/PermissionUncheckedUpdateInput.schema';

export const PermissionUpsertOneSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema, create: z.union([ PermissionCreateInputObjectSchema, PermissionUncheckedCreateInputObjectSchema ]), update: z.union([ PermissionUpdateInputObjectSchema, PermissionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PermissionUpsertArgs>;

export const PermissionUpsertOneZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(),  where: PermissionWhereUniqueInputObjectSchema, create: z.union([ PermissionCreateInputObjectSchema, PermissionUncheckedCreateInputObjectSchema ]), update: z.union([ PermissionUpdateInputObjectSchema, PermissionUncheckedUpdateInputObjectSchema ]) }).strict();