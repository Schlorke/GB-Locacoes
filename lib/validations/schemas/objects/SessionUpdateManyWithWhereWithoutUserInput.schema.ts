import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionScalarWhereInputObjectSchema } from './SessionScalarWhereInput.schema';
import { SessionUpdateManyMutationInputObjectSchema } from './SessionUpdateManyMutationInput.schema';
import { SessionUncheckedUpdateManyWithoutUserInputObjectSchema } from './SessionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => SessionUpdateManyMutationInputObjectSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const SessionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput>;
export const SessionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
