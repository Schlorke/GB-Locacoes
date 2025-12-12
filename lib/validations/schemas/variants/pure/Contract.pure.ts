/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { ContractStatusSchema } from '../../enums/ContractStatus.schema';
// prettier-ignore
export const ContractModelSchema = z.object({
    id: z.string(),
    rentalId: z.string(),
    rental: z.unknown(),
    template: z.string().nullable(),
    content: z.string().nullable(),
    pdfUrl: z.string().nullable(),
    signedAt: z.date().nullable(),
    signedBy: z.string().nullable(),
    zapSignId: z.string().nullable(),
    status: ContractStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ContractPureType = z.infer<typeof ContractModelSchema>;
