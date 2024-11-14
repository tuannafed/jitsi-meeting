export const noop = () => {};
export const isBrowser = typeof window !== 'undefined';
export const isNavigator = typeof navigator !== 'undefined';

type Payload = {
  [key: string]: string | string[];
};

export const formattedQueryString = (payload: Payload) =>
  Object.keys(payload)
    .map((key) => {
      const value = payload[key];
      if (Array.isArray(value)) {
        // Join array elements with '&'
        return `${key}=${value.join('%2C%20')}`;
      }

      // Handle non-array values
      return `${key}=${value}`;
    })
    .join('&');
