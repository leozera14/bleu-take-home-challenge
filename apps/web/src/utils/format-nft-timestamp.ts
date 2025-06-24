import { formatDistanceToNow, fromUnixTime } from 'date-fns';

export const formatNftTimestamp = (timestamp: number) => {
  const date = fromUnixTime(timestamp);

  return formatDistanceToNow(date, { addSuffix: true });
};
