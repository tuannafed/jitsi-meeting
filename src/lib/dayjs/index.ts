import 'dayjs/locale/ja';

import dayjs, { Dayjs } from 'dayjs';

dayjs.locale('en');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDayjs(value: any): value is dayjs.Dayjs {
  return dayjs.isDayjs(value);
}

export { Dayjs, dayjs, isDayjs };
