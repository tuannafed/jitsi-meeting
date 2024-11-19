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

export const importJitsiApi = (): Promise<void> =>
  new Promise((resolve) => {
    if (window.JitsiMeetExternalAPI) {
      resolve(window.JitsiMeetExternalAPI);
    } else {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');

      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://meet.jit.si/external_api.js');

      head.addEventListener(
        'load',
        function (event: any) {
          if (event.target.nodeName === 'SCRIPT') {
            resolve(window.JitsiMeetExternalAPI);
          }
        },
        true
      );

      head.appendChild(script);
    }
  });
