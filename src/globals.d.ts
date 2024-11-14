type TLoading = 'idle' | 'loading';
type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type TMode = 'cors' | 'no-cors' | 'same-origin';

export type APIConfig = {
  keys: string[];
  apiUrl?: string;
  endPoint: string;
  method: TMethod;
  accessToken?: boolean;
  mode?: TMode;
  factoryData?: object;
};

type TApiError = {
  input: string | null;
  msg: string;
  type: string;
  loc: string[];
};

type TApiResponseBase<T> = {
  data: T | { errors: TApiError[] };
  code: string;
  msg: string;
};

type TApiResponseSSR = {
  error?: string;
  success?: boolean;
};
