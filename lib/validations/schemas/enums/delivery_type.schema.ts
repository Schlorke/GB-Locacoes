/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const delivery_typeSchema = z.enum(['pickup', 'delivery', 'both'])

export type delivery_type = z.infer<typeof delivery_typeSchema>;