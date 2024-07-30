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

function getWeekLabelAndValue(date: Date) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
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

  return { label, value };
}

export function parseWeekData(response: any[]) {
  const uniqueLabels = new Set();
  const parsedData: any[] = [];

  response.forEach((entry) => {
    const { label, value } = getWeekLabelAndValue(parseISO(entry.createdAt));

    if (!uniqueLabels.has(label)) {
      uniqueLabels.add(label);
      parsedData.push({ id: entry.id, label, value });
    }
  });

  // Calculate the current week and add it if not already included
  const { label: currentLabel, value: currentValue } = getWeekLabelAndValue(
    new Date()
  );

  if (!uniqueLabels.has(currentLabel)) {
    uniqueLabels.add(currentLabel);
    parsedData.push({
      id: 'current',
      label: currentLabel,
      value: currentValue,
    });
  }

  return parsedData;
}
