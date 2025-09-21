import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutSessionsInputObjectSchema } from './UserCreateNestedOneWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputObjectSchema)
}).strict();
export const SessionCreateInputObjectSchema: z.ZodType<Prisma.SessionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionCreateInput>;
export const SessionCreateInputObjectZodSchema = makeSchema();
