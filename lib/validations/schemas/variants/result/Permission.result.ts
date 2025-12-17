import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const PermissionResultSchema = z.object({
    id: z.string(),
    role: RoleSchema,
    module: z.string(),
    action: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PermissionResultType = z.infer<typeof PermissionResultSchema>;
