/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { DefaultError, useMutation as useReactMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { input, output, ZodType, ZodTypeAny } from 'zod';

import { useToken } from '@/hooks/useAuth';
import { TResponse } from '@/schemas/template/response';
import { useAppDispatch } from '@/stores/hooks';
import { appAction } from '@/stores/reducers/app';
import { fetchClientSide } from '@/utils/api/fetchClientSide';

import { UseMutationProps } from './declaration';

export const useMutation = <
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
>(
  props: UseMutationProps<TRequestSchema, TResponseSchema>
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

  const mutation = useReactMutation<output<TResponseSchema>, DefaultError, input<TRequestSchema>>({
    ...(options || ({} as any)),
    mutationFn: (variables) => {
      return fetchClientSide<TRequestSchema, TResponseSchema>({
        apiConfig,
        responseSchema,
        requestSchema,
        options: fetchOptions,
        parameters,
        payload: variables,
        accessToken: '',
        refreshToken: undefined,
        onError,
        onSuccess,
        // logout,
        setLoading,
        withQueryParams,
      });
    },
    refetchOnWindowFocus: false,
    mutationKey: [...apiConfig.keys, options?.mutationKey],
  });

  const { error } = mutation;

  // Application Error
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return mutation;
};
