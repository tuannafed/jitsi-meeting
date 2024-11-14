/* eslint-disable @typescript-eslint/no-explicit-any */
import { input, output, ZodType, ZodTypeAny } from 'zod';

import { APIConfig } from '@/globals';
import { TResponse } from '@/schemas/template/response';
import { EndPointParameter } from '@/utils';

export type ResponseType = 'error' | 'success';

export interface BaseFetcherProp {
  apiConfig: APIConfig;
  options?: RequestInit;
  setLoading?: (data: boolean) => void;
}

export type TRefreshTokenFetcher = {
  accessToken?: string;
  refreshToken?: string;
};

export type FetchClientSideProps<
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
> = BaseFetcherProp & {
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: input<TRequestSchema>;
  parameters?: EndPointParameter;
  init?: RequestInit;
  accessToken?: string;
  refreshToken?: string;
  onRefreshToken?: (arg: TRefreshTokenFetcher) => void;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  logout?: () => void;
  setLoading?: (data: boolean) => void;
  withQueryParams?: boolean;
};

export interface FetcherProps<
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
> {
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: input<TRequestSchema>;
  parameters?: EndPointParameter;
  init: RequestInit;
  endpoint: string;
  setLoading?: (data: boolean) => void;
  accessToken?: string;
  withQueryParams?: boolean;
}

export type CallApiProps = {
  init: RequestInit;
  url: string;
  headers?: HeadersInit;
  body?: BodyInit;
  refreshToken?: string;
};

export type TReponseHandler<TResponseSchema extends ZodType<TResponse>> = {
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  response: output<TResponseSchema>;
  logout?: () => void;
};
