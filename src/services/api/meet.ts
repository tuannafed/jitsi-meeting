import { COMPUTE_API_URL } from '@/constants/app';
import { APIConfig } from '@/globals';

export const getServersApi: APIConfig = {
  endPoint: '/servers/detail',
  apiUrl: COMPUTE_API_URL,
  keys: ['get-servers'],
  method: 'GET',
  accessToken: true,
};
