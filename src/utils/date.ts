import { DateTime } from "luxon";

export const formatNaturalDate = (date: Date): string => {
  const now = DateTime.now();
  const logDate = DateTime.fromJSDate(date);

  if (logDate.hasSame(now, 'day')) {
    return 'today';
  }

  if (logDate.hasSame(now.minus({ days: 1 }), 'day')) {
    return 'yesterday';
  }

  if (logDate.hasSame(now, 'year')) {
    return logDate.toFormat('MMMM d');
  }

  return logDate.toFormat('MMMM d, yyyy');
};

export const formatRelativeTime = (date: Date): string => {
  const now = DateTime.now();
  const logDate = DateTime.fromJSDate(date);
  const diff = now.diff(logDate, ['days', 'hours', 'minutes']).toObject();

  if (diff.days && diff.days > 0) {
    return `${Math.floor(diff.days)} days ago`;
  }

  if (diff.hours && diff.hours > 0) {
    return `${Math.floor(diff.hours)} hours ago`;
  }

  if (diff.minutes && diff.minutes > 0) {
    return `${Math.floor(diff.minutes)} minutes ago`;
  }

  return 'Just now';
}; 