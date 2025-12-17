import * as z from 'zod';

export const RoleSchema = z.enum(['ADMIN', 'CLIENT'])

export type Role = z.infer<typeof RoleSchema>;