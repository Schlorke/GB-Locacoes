/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationCreateManyUserInputObjectSchema as NotificationCreateManyUserInputObjectSchema } from './NotificationCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => NotificationCreateManyUserInputObjectSchema), z.lazy(() => NotificationCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const NotificationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.NotificationCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.NotificationCreateManyUserInputEnvelope>;
export const NotificationCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
