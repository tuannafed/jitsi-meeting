/* eslint-disable @typescript-eslint/no-explicit-any */

import qs from 'query-string';
import { output, ZodType, ZodTypeAny } from 'zod';

import { IDENTITY_API_URL } from '@/constants/app';
import { HTTP_STATUS_CODE } from '@/constants/httpCode';
import { TResponse } from '@/schemas/template/response';
import { formattedQueryString, isValidUrl } from '@/utils';

import { FetcherProps } from '../declaration';

export async function fetcher<
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
>(props: FetcherProps<TRequestSchema, TResponseSchema>): Promise<output<TResponseSchema>> {
  const {
    endpoint,
    init,
    responseSchema,
    requestSchema,
    payload,
    setLoading,
    accessToken,
    withQueryParams,
  } = props;
  const headers = new Headers(init?.headers);

  setLoading && setLoading(true);

  try {
    let body;
    const payloadParser = requestSchema && requestSchema.parse(payload);

    if (init?.method !== 'GET') {
      body = JSON.stringify(payloadParser);
    }

    // Check the enpoint is next route api
    const combineUrl = !isValidUrl(endpoint) ? `${IDENTITY_API_URL}${endpoint}` : endpoint;

    // combine url
    const url = qs.stringifyUrl(
      { url: combineUrl, query: payloadParser && (payloadParser as any) },
      { arrayFormat: 'comma', skipNull: true, skipEmptyString: true }
    );

    const constructUrl = (): string => {
      if (init?.method === 'GET' && withQueryParams) {
        return `${combineUrl}?${formattedQueryString(payloadParser)}`;
      } else if (init?.method === 'GET' || withQueryParams) {
        return url;
      } else {
        return combineUrl;
      }
    };

    const fetchUrl = constructUrl();

    const res = await fetch(fetchUrl, {
      ...(init ?? {}),
      headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

    const result = await res.json();

    // return if the endpoint is login request
    let token;

    if (result.error) {
      return responseSchema.parse({
        data: null,
        statusCode: result.error.code,
        success: false,
        errors: [
          {
            code: `${result.error.code}`,
            message: result.error.message,
          },
        ],
      });
    }

    return responseSchema.parse({
      data: {
        ...result,
        accessToken: token,
      },
      statusCode: HTTP_STATUS_CODE.OK,
      success: true,
    });
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.error('exception :', JSON.stringify(exception, null, 2));

    return responseSchema.parse({
      statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: null,
      errors: [
        {
          code: `${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR}`,
          message: exception instanceof Error ? exception.message : 'Internal Server Error',
        },
      ],
      success: false,
    });
  } finally {
    setLoading && setLoading(false);
  }
}
