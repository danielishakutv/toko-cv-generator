import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, formatStr: string = 'MMM yyyy'): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch {
    return dateString;
  }
}

export function formatDateRange(start: string, end?: string, current?: boolean): string {
  const startFormatted = formatDate(start);
  if (current) {
    return `${startFormatted} - Present`;
  }
  if (end) {
    return `${startFormatted} - ${formatDate(end)}`;
  }
  return startFormatted;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
