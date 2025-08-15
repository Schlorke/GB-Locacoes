import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserCreateNestedOneWithoutSessionsInputObjectSchema } from './UserCreateNestedOneWithoutSessionsInput.schema'

export const SessionCreateInputObjectSchema: z.ZodType<Prisma.SessionCreateInput, Prisma.SessionCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputObjectSchema)
}).strict();
export const SessionCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputObjectSchema)
}).strict();
