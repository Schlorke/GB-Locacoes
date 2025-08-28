import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereUniqueInputObjectSchema } from './SessionWhereUniqueInput.schema';
import { SessionUpdateWithoutUserInputObjectSchema } from './SessionUpdateWithoutUserInput.schema';
import { SessionUncheckedUpdateWithoutUserInputObjectSchema } from './SessionUncheckedUpdateWithoutUserInput.schema';
import { SessionCreateWithoutUserInputObjectSchema } from './SessionCreateWithoutUserInput.schema';
import { SessionUncheckedCreateWithoutUserInputObjectSchema } from './SessionUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => SessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => SessionUpdateWithoutUserInputObjectSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputObjectSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const SessionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput>;
export const SessionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
