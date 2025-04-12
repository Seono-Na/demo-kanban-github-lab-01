import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (isoDate: string): string => {
  return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
};
