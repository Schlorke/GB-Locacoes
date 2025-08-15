import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema';
import { SessionUpdateWithoutUserInputObjectSchema } from './SessionUpdateWithoutUserInput.schema';
import { SessionUncheckedUpdateWithoutUserInputObjectSchema } from './SessionUncheckedUpdateWithoutUserInput.schema'

export const SessionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput, Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => SessionUpdateWithoutUserInputObjectSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const SessionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => SessionUpdateWithoutUserInputObjectSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
