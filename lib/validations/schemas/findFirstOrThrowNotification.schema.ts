/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NotificationIncludeObjectSchema as NotificationIncludeObjectSchema } from './objects/NotificationInclude.schema';
import { NotificationOrderByWithRelationInputObjectSchema as NotificationOrderByWithRelationInputObjectSchema } from './objects/NotificationOrderByWithRelationInput.schema';
import { NotificationWhereInputObjectSchema as NotificationWhereInputObjectSchema } from './objects/NotificationWhereInput.schema';
import { NotificationWhereUniqueInputObjectSchema as NotificationWhereUniqueInputObjectSchema } from './objects/NotificationWhereUniqueInput.schema';
import { NotificationScalarFieldEnumSchema } from './enums/NotificationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NotificationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    type: z.boolean().optional(),
    priority: z.boolean().optional(),
    title: z.boolean().optional(),
    message: z.boolean().optional(),
    isRead: z.boolean().optional(),
    readAt: z.boolean().optional(),
    actionUrl: z.boolean().optional(),
    metadata: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.NotificationSelect>;

export const NotificationFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    type: z.boolean().optional(),
    priority: z.boolean().optional(),
    title: z.boolean().optional(),
    message: z.boolean().optional(),
    isRead: z.boolean().optional(),
    readAt: z.boolean().optional(),
    actionUrl: z.boolean().optional(),
    metadata: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const NotificationFindFirstOrThrowSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> = z.object({ select: NotificationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => NotificationIncludeObjectSchema.optional()), orderBy: z.union([NotificationOrderByWithRelationInputObjectSchema, NotificationOrderByWithRelationInputObjectSchema.array()]).optional(), where: NotificationWhereInputObjectSchema.optional(), cursor: NotificationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.NotificationFindFirstOrThrowArgs>;

export const NotificationFindFirstOrThrowZodSchema = z.object({ select: NotificationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => NotificationIncludeObjectSchema.optional()), orderBy: z.union([NotificationOrderByWithRelationInputObjectSchema, NotificationOrderByWithRelationInputObjectSchema.array()]).optional(), where: NotificationWhereInputObjectSchema.optional(), cursor: NotificationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array()]).optional() }).strict();