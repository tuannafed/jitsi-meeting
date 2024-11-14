import { z } from 'zod';

import { ResponseSchema } from '@/schemas/template/response';

const UserResSchema = z.object({
  domain: z.object({
    id: z.string(),
    name: z.string(),
  }),
  id: z.string().optional(),
  name: z.string(),
  password_expires_at: z.nullable(z.string()), // nullable string
});

const ProjectResSchema = z.object({
  domain: z.object({
    id: z.string(),
    name: z.string(),
  }),
  id: z.string(),
  name: z.string(),
});

const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CatelogEndpointSchema = z.object({
  id: z.string(),
  interface: z.string(),
  region_id: z.string(),
  url: z.string().url(),
  region: z.string(),
});

const CatelogSchema = z.object({
  endpoints: z.array(CatelogEndpointSchema),
  id: z.string(),
  type: z.string(),
  name: z.string(),
});

const LoginResSchema = z.object({
  accessToken: z.string(),
  audit_ids: z.array(z.string()),
  catalog: z.array(CatelogSchema),
  expires_at: z.string(),
  is_domain: z.boolean(),
  issued_at: z.string(),
  methods: z.array(z.string()),
  project: ProjectResSchema,
  roles: z.array(RoleSchema),
  user: UserResSchema,
});

export const LoginRes = ResponseSchema.extend({
  token: LoginResSchema.optional(),
});

export type TLoginRes = z.infer<typeof LoginResSchema>;
export type TUserRes = z.infer<typeof UserResSchema>;
