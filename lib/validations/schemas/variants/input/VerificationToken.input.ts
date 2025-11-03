/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const VerificationTokenInputSchema = z.object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date()
}).strict();

export type VerificationTokenInputType = z.infer<typeof VerificationTokenInputSchema>;
