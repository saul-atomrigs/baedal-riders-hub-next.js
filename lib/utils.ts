import { type ClassValue, clsx } from 'clsx';
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
