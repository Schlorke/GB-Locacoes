/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PermissionSelectObjectSchema as PermissionSelectObjectSchema } from './objects/PermissionSelect.schema';
import { PermissionCreateManyInputObjectSchema as PermissionCreateManyInputObjectSchema } from './objects/PermissionCreateManyInput.schema';

export const PermissionCreateManyAndReturnSchema: z.ZodType<Prisma.PermissionCreateManyAndReturnArgs> = z.object({ select: PermissionSelectObjectSchema.optional(), data: z.union([ PermissionCreateManyInputObjectSchema, z.array(PermissionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PermissionCreateManyAndReturnArgs>;

export const PermissionCreateManyAndReturnZodSchema = z.object({ select: PermissionSelectObjectSchema.optional(), data: z.union([ PermissionCreateManyInputObjectSchema, z.array(PermissionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();