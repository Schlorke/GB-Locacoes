import { z } from 'zod';
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema'

export const QuoteDeleteManySchema = z.object({ where: QuoteWhereInputObjectSchema.optional()  })