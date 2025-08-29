import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SessionIncludeObjectSchema } from './objects/SessionInclude.schema';
import { SessionOrderByWithRelationInputObjectSchema } from './objects/SessionOrderByWithRelationInput.schema';
import { SessionWhereInputObjectSchema } from './objects/SessionWhereInput.schema';
import { SessionWhereUniqueInputObjectSchema } from './objects/SessionWhereUniqueInput.schema';
import { SessionScalarFieldEnumSchema } from './enums/SessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SessionFindFirstSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SessionSelect>;

export const SessionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const SessionFindFirstSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({ select: SessionFindFirstSelectSchema.optional(), include: z.lazy(() => SessionIncludeObjectSchema.optional()), orderBy: z.union([SessionOrderByWithRelationInputObjectSchema, SessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: SessionWhereInputObjectSchema.optional(), cursor: SessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.SessionScalarFieldEnum), z.nativeEnum(Prisma.SessionScalarFieldEnum).array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SessionFindFirstArgs>;

export const SessionFindFirstZodSchema = z.object({ select: SessionFindFirstSelectSchema.optional(), include: z.lazy(() => SessionIncludeObjectSchema.optional()), orderBy: z.union([SessionOrderByWithRelationInputObjectSchema, SessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: SessionWhereInputObjectSchema.optional(), cursor: SessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.SessionScalarFieldEnum), z.nativeEnum(Prisma.SessionScalarFieldEnum).array()]).optional() }).strict();