import { output, ZodType, ZodTypeAny } from 'zod';

import { HTTP_STATUS_AUTH_FAILED, HTTP_STATUS_CODE } from '@/constants/httpCode';
import { TResponse } from '@/schemas/template/response';
import { parseApiEndpoint } from '@/utils/parseApiEndpoint';

import { FetchClientSideProps, TReponseHandler } from './declaration';
import { fetcher } from './fetcher';

export async function fetchClientSide<
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
>(props: FetchClientSideProps<TRequestSchema, TResponseSchema>): Promise<output<TResponseSchema>> {
  const { apiConfig, options, parameters, refreshToken, onError, onSuccess, logout } = props;
  const apiUrl = apiConfig?.apiUrl
    ? `${apiConfig?.apiUrl}${apiConfig.endPoint}`
    : apiConfig.endPoint;

  const res = await fetcher<TRequestSchema, TResponseSchema>({
    ...props,
    endpoint: parseApiEndpoint(apiUrl, parameters),
    init: {
      ...options,
      method: apiConfig.method,
      mode: apiConfig.mode,
      next: {
        tags: apiConfig.keys,
      },
    },
  });

  if (HTTP_STATUS_AUTH_FAILED.includes(res.statusCode) === true && refreshToken) {
    return handleResponse({
      response: res,
      onError,
      onSuccess,
      logout,
    });
  }

  return handleResponse({
    response: res,
    onError,
    onSuccess,
    logout,
  });
}

function handleResponse<TResponseSchema extends ZodType<TResponse>>(
  args: TReponseHandler<TResponseSchema>
) {
  const { response, onError, onSuccess, logout } = args;
  // Success
  if (response?.statusCode === HTTP_STATUS_CODE.OK) {
    // Customer success
    onSuccess &&
      onSuccess({
        data: response?.data,
        statusCode: response?.statusCode,
        success: response?.success,
      });

    return response;
  }

  // Error
  if (response?.statusCode !== HTTP_STATUS_CODE.OK) {
    if (HTTP_STATUS_AUTH_FAILED.includes(response?.statusCode) === true) {
      logout && logout();

      return response;
    }

    // Custom error
    onError &&
      onError({
        data: response?.data,
        statusCode: response?.statusCode,
        errors: response?.errors,
        success: response?.success,
      });

    return response;
  }

  return response;
}
