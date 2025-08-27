import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SettingSelectObjectSchema } from './SettingSelect.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      select: z.lazy(() => SettingSelectObjectSchema).optional(),
    })
    .strict()
export const SettingArgsObjectSchema = makeSchema()
export const SettingArgsObjectZodSchema = makeSchema()
