/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { ContractStatusSchema } from '../../enums/ContractStatus.schema';
// prettier-ignore
export const ContractInputSchema = z.object({
    id: z.string(),
    rentalId: z.string(),
    rental: z.unknown(),
    template: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    pdfUrl: z.string().optional().nullable(),
    signedAt: z.date().optional().nullable(),
    signedBy: z.string().optional().nullable(),
    zapSignId: z.string().optional().nullable(),
    status: ContractStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ContractInputType = z.infer<typeof ContractInputSchema>;
