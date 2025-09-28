/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const RoleSchema = z.enum(['ADMIN', 'CLIENT'])

export type Role = z.infer<typeof RoleSchema>;