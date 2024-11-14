import { z } from 'zod';

export const PaginationReqSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number().optional(),
});

export type TPaginationReq = z.infer<typeof PaginationReqSchema>;
