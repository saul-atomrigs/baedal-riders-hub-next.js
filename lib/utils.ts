import { type ClassValue, clsx } from 'clsx';
import {
  endOfWeek,
  format,
  parseISO,
  startOfWeek,
  startOfMonth,
  differenceInCalendarWeeks,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateInKorean(date: Date) {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function saveInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function parseWeekData(response: any[]) {
  const uniqueLabels = new Set();
  const parsedData: any[] = [];

  response.forEach((entry) => {
    const createdAt = parseISO(entry.createdAt);
    const weekStart = startOfWeek(createdAt, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(createdAt, { weekStartsOn: 1 });
    const startOfMonthDate = startOfMonth(weekStart);
    const weekNumber =
      differenceInCalendarWeeks(weekStart, startOfMonthDate, {
        weekStartsOn: 1,
      }) + 1;
    const label = `${format(weekStart, 'yyyy년 M월')} ${weekNumber}주`;
    const value = `${format(weekStart, 'yyyy-MM-dd')}_to_${format(
      weekEnd,
      'yyyy-MM-dd'
    )}`;

    if (!uniqueLabels.has(label)) {
      uniqueLabels.add(label);
      parsedData.push({ id: entry.id, label, value });
    }
  });

  return parsedData;
}
