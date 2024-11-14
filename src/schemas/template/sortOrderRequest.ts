import { z } from 'zod';

// write enum
const SortOrderEnum = z.enum(['asc', 'desc']);

export const SortOrderReqSchema = z.object({
  sort_columns: z.string().optional(),
  sort_orders: SortOrderEnum.default('asc').optional(),
});

export type TSortOrderReq = z.infer<typeof SortOrderReqSchema>;
