import { formatRelative, subDays } from 'date-fns';

export const getRelDate = (date: Date) =>
  formatRelative(subDays(new Date(date), 3), new Date());
