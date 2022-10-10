import { formatRelative } from 'date-fns';

export const getRelDate = (date: Date) =>
  formatRelative(new Date(date), new Date());
