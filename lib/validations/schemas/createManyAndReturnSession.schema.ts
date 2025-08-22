import { z } from 'zod';
import { SessionSelectObjectSchema } from './objects/SessionSelect.schema';
import { SessionIncludeObjectSchema } from './objects/SessionInclude.schema';
import { SessionCreateManyInputObjectSchema } from './objects/SessionCreateManyInput.schema'

export const SessionCreateManyAndReturnSchema = z.object({ select: SessionSelectObjectSchema.optional(), include: SessionIncludeObjectSchema.optional(), data: z.union([ SessionCreateManyInputObjectSchema, z.array(SessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })