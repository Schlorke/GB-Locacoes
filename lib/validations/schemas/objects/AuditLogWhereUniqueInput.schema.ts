import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AuditLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.AuditLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogWhereUniqueInput>;
export const AuditLogWhereUniqueInputObjectZodSchema = makeSchema();
