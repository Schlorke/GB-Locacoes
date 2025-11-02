import * as z from 'zod';

export const UserRoleSchema = z.enum(['ADMIN', 'OPERATOR', 'FINANCIAL', 'CUSTOMER'])

export type UserRole = z.infer<typeof UserRoleSchema>;