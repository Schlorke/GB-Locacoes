import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SessionIncludeObjectSchema } from './objects/SessionInclude.schema';
import { SessionOrderByWithRelationInputObjectSchema } from './objects/SessionOrderByWithRelationInput.schema';
import { SessionWhereInputObjectSchema } from './objects/SessionWhereInput.schema';
import { SessionWhereUniqueInputObjectSchema } from './objects/SessionWhereUniqueInput.schema';
import { SessionScalarFieldEnumSchema } from './enums/SessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SessionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SessionSelect>;

export const SessionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const SessionFindFirstOrThrowSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({ select: SessionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => SessionIncludeObjectSchema.optional()), orderBy: z.union([SessionOrderByWithRelationInputObjectSchema, SessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: SessionWhereInputObjectSchema.optional(), cursor: SessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.SessionScalarFieldEnum), z.nativeEnum(Prisma.SessionScalarFieldEnum).array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SessionFindFirstOrThrowArgs>;

export const SessionFindFirstOrThrowZodSchema = z.object({ select: SessionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => SessionIncludeObjectSchema.optional()), orderBy: z.union([SessionOrderByWithRelationInputObjectSchema, SessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: SessionWhereInputObjectSchema.optional(), cursor: SessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.SessionScalarFieldEnum), z.nativeEnum(Prisma.SessionScalarFieldEnum).array()]).optional() }).strict();