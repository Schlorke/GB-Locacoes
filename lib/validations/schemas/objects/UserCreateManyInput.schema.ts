import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { RoleSchema } from '../enums/Role.schema'

export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput, Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string().nullish(),
  role: RoleSchema.optional(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const UserCreateManyInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string().nullish(),
  role: RoleSchema.optional(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
