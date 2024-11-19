import { z } from 'zod';

import { ResponseSchema } from '@/schemas/template/response';

const LoginResSchema = z.object({});

export const LoginRes = ResponseSchema.extend({});

export type TLoginRes = z.infer<typeof LoginResSchema>;
