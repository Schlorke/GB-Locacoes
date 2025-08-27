import { z } from 'zod';
import { SessionSelectObjectSchema } from './objects/SessionSelect.schema';
import { SessionUpdateManyMutationInputObjectSchema } from './objects/SessionUpdateManyMutationInput.schema';
import { SessionWhereInputObjectSchema } from './objects/SessionWhereInput.schema';

export const SessionUpdateManyAndReturnSchema = z.object({ select: SessionSelectObjectSchema.optional(), data: SessionUpdateManyMutationInputObjectSchema, where: SessionWhereInputObjectSchema.optional()  }).strict()