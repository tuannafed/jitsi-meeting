import { z } from 'zod';

export const PaginationResSchema = z.object({
  page: z.number(),
  size: z.number(),
  total: z.number().optional(),
  total_pages: z.number().optional(),
});

export const PaginationRes = z
  .object({
    items: z.array(z.any()),
  })
  .merge(PaginationResSchema);

const PaginationSchema = z.object({
  page: z.number(),
  size: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export type TPagination = z.infer<typeof PaginationSchema>;
export type TPaginationRes = z.infer<typeof PaginationResSchema>;
