import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function generateCssVariables(theme: Record<string, string>): string {
  return Object.entries(theme)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n');
}