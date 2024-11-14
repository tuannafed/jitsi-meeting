import { z } from 'zod';

import { PaginationReqSchema } from './paginationRequest';
import { SortOrderReqSchema } from './sortOrderRequest';

export const CustomRequest = z.object({}).merge(SortOrderReqSchema).merge(PaginationReqSchema);

export type TCustomRequest = z.infer<typeof CustomRequest>;
