/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const PermissionModelSchema = z.object({
    id: z.string(),
    role: RoleSchema,
    module: z.string(),
    action: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PermissionPureType = z.infer<typeof PermissionModelSchema>;
