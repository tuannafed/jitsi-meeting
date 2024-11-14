/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery as useReactQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { output, ZodType, ZodTypeAny } from 'zod';

import { queryClient } from '@/components/layout/appProvider';
import { HTTP_STATUS_CODE } from '@/constants/httpCode';
import { useToken } from '@/hooks/useAuth';
import { TResponse } from '@/schemas/template/response';
import { useAppDispatch } from '@/stores/hooks';
import { appAction } from '@/stores/reducers/app';
import { fetchClientSide } from '@/utils/api/fetchClientSide';

import { UseQueryProps } from './declaration';

export const useQuery = <
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
>(
  props: UseQueryProps<TRequestSchema, TResponseSchema>
) => {
  const {
    apiConfig,
    requestSchema,
    responseSchema,
    options,
    onError,
    onSuccess,
    fetchOptions,
    parameters,
    payload,
    loadingKey,
    withQueryParams = false,
  } = props;

  const token = useToken();
  const dispatch = useAppDispatch();

  const setLoading = (isLoading: boolean) => {
    if (loadingKey) {
      dispatch(
        isLoading === true
          ? appAction.setLoading({ name: loadingKey })
          : appAction.destroyLoading({ name: loadingKey })
      );
    }
  };

  const queryResult = useReactQuery<output<TResponseSchema>>({
    ...(options || ({} as any)),
    queryFn: () => {
      return fetchClientSide<TRequestSchema, TResponseSchema>({
        apiConfig,
        responseSchema,
        requestSchema,
        options: fetchOptions,
        parameters,
        accessToken: '',
        refreshToken: undefined,
        payload,
        // logout,
        onError,
        onSuccess,
        setLoading,
        withQueryParams,
      });
    },
    refetchOnWindowFocus: false,
    queryKey: [...apiConfig.keys, options?.queryKey],
  });

  const { data, error } = queryResult;

  // Application Error
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (data?.statusCode === HTTP_STATUS_CODE.OK) {
      queryClient.removeQueries({ type: 'inactive' });
    }
  }, [data?.statusCode]);

  return queryResult;
};
