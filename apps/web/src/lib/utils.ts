import { IHandleUseQuery } from '@/types/handleUserQuery';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useQuery } from 'urql';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
